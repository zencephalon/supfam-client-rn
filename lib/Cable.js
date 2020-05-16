import AuthToken from '~/lib/AuthToken';
import { API_URL } from '~/lib/constants';

import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

import * as Battery from 'expo-battery';
import NetInfo from '@react-native-community/netinfo';

import { AppState } from 'react-native';

import { throttle } from 'lodash';

import * as Cellular from 'expo-cellular';

import {
  addReceivedMessage,
  updateInstantMessages,
  updateProfileOrSeen,
} from '~/lib/QueryCache';

class CCable {
  init = ({ profileId, friendIds }) => {
    ActionCable.startDebugging();
    const URL = `${API_URL}cable?token=${
      AuthToken.get().token
    }&profileId=${profileId}`;

    this.seenChannel = null;
    this.conversationChannels = {};
    this.instantChannels = {};
    this.friendChannels = {};

    this.consumer = ActionCable.createConsumer(URL);
    this.cable = new Cable({});

    this.setupFriendChannels(friendIds);
    this.setupSeenChannel();
  };

  subscribeConversation = (conversationId, meProfileId) => {
    if (!conversationId) {
      return;
    }

    this.conversationChannels[conversationId] = this.cable.setChannel(
      `conversation:${conversationId}`,
      this.consumer.subscriptions.create({
        channel: 'MessageChannel',
        id: conversationId,
      })
    );
    this.instantChannels[conversationId] = this.cable.setChannel(
      `instant:${conversationId}`,
      this.consumer.subscriptions.create({
        channel: 'InstantMessageChannel',
        id: conversationId,
      })
    );

    this.conversationChannels[conversationId].on('received', (data) => {
      console.log('received', data.message);
      addReceivedMessage(conversationId, data.message);
      updateInstantMessages(conversationId, null);
    });

    this.instantChannels[conversationId].on('received', ({ message }) => {
      updateInstantMessages(conversationId, message);
    });
  };

  unsubscribeConversation = (conversationId) => {
    this.conversationChannels[conversationId]?.unsubscribe();
  };

  setupFriendChannels = (friendIds) => {
    if (!friendIds) {
      return;
    }
    friendIds.forEach((friendId) => {
      this.friendChannels[friendId] = this.cable.setChannel(
        `friend:${friendId}`,
        this.consumer.subscriptions.create({
          channel: 'ProfileChannel',
          id: friendId,
        })
      );

      this.friendChannels[friendId].on('received', (data) =>
        updateProfileOrSeen(friendId, data)
      );
    });
  };

  setupSeenChannel = () => {
    this.seenChannel = this.cable.setChannel(
      'seenChannel',
      this.consumer.subscriptions.create({
        channel: 'SeenChannel',
      })
    );

    AppState.addEventListener('change', this.doSeenUpdate);
    NetInfo.addEventListener(this.doSeenUpdate);
    Battery.addBatteryStateListener(this.doSeenUpdate);
    setInterval(this.doSeenUpdate, 15 * 1000);
  };

  sendInstant = (conversationId, message) => {
    this.instantChannels[conversationId]?.perform('send_instant', { message });
  };

  doSeenUpdate = throttle(async () => {
    const {
      batteryLevel: battery,
      batteryState: battery_state,
    } = await Battery.getPowerStateAsync();

    const data = { battery, battery_state };

    const netInfo = await NetInfo.fetch();
    data.network_type = netInfo.type;

    if (netInfo.type === 'wifi') {
      data.network_strength = netInfo.details.strength || 5;
    }
    if (netInfo.type === '') {
      data.cellular_generation = await Cellular.getCellularGenerationAsync();
    }

    this.seenChannel?.perform('update_seen', { data });
  }, 1000);

  disconnect = () => {
    this.consumer.disconnect();
  };
}

const cable = new CCable();

export default cable;
