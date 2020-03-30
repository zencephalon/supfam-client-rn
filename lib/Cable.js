import AuthToken from '~/lib/AuthToken';
import { API_URL } from '~/lib/constants';

import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

import { queryCache } from 'react-query';

import * as Battery from 'expo-battery';
import NetInfo from '@react-native-community/netinfo';

import { AppState } from 'react-native';

import { throttle } from 'lodash';

import * as Cellular from 'expo-cellular';

class CCable {
  init = () => {
    ActionCable.startDebugging();
    const URL = `${API_URL}cable?token=${AuthToken.get().token}`;

    this.conversationChannels = {};
    this.instantChannels = {};

    this.consumer = ActionCable.createConsumer(URL);
    this.cable = new Cable({});

    this.setupFamilyChannels();
    this.setupSeenChannel();
    this.setupMyStatusChannel();
  };

  subscribeConversation = (conversationId, userId) => {
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
    this.conversationChannels[conversationId].on('received', data => {
      console.log('received on conversation', data);
      queryCache.setQueryData(['dm_messages', { userId: userId }], messages => {
        return [...messages, data.message];
      });
    });

    this.instantChannels[conversationId] = this.cable.setChannel(
      `instant:${conversationId}`,
      this.consumer.subscriptions.create({
        channel: 'InstantMessageChannel',
        id: conversationId,
      })
    );
    this.instantChannels[conversationId].on('received', data => {
      queryCache.setQueryData(
        ['instant_messages', { userId: userId }],
        message => {
          return data;
        }
      );
    });
  };

  unsubscribeConversation = conversationId => {
    this.conversationChannels[conversationId]?.unsubscribe();
  };

  setupFamilyChannels = () => {
    this.familyChannel = this.cable.setChannel(
      'family',
      this.consumer.subscriptions.create({
        channel: 'FamilyChannel',
        // TODO: we have to get this from the user's families
        id: 1,
      })
    );
    // Gotta deal with this properly soon.
    this.familyChannel.on('received', data => {
      const { user } = data;
      queryCache.setQueryData('friends', friends => {
        return friends.map(friend => (user.id === friend.id ? user : friend));
      });
    });
  };

  setupSeenChannel = () => {
    this.seenChannel = this.cable.setChannel(
      'seen',
      this.consumer.subscriptions.create({
        channel: 'SeenChannel',
      })
    );

    AppState.addEventListener('change', this.doSeenUpdate);
    NetInfo.addEventListener(this.doSeenUpdate);
    Battery.addBatteryStateListener(this.doSeenUpdate);
    setInterval(this.doSeenUpdate, 15 * 1000);
  };

  setupMyStatusChannel = () => {
    this.mystatusChannel = this.cable.setChannel(
      'mystatus',
      this.consumer.subscriptions.create({
        channel: 'StatusChannel',
      })
    );

    this.mystatusChannel.on('received', data => {
      const { status } = data;
      queryCache.setQueryData('statusMe', () => {
        return status;
      });
    });
  };

  updateStatus = data => {
    this.mystatusChannel.perform('update_status', { data });
  };

  sendInstant = (conversationId, data) => {
    this.instantChannels[conversationId]?.perform('send_instant', { data });
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

    this.seenChannel.perform('update_seen', { data });
  }, 1000);

  disconnect = () => {
    this.consumer.disconnect();
  };
}

const cable = new CCable();

export default cable;
