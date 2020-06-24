import AuthToken from '~/lib/AuthToken';
import { API_URL } from '~/lib/constants';
import processMessage from '~/lib/processMessage';

import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

import * as Battery from 'expo-battery';
import NetInfo from '@react-native-community/netinfo';

import { AppState } from 'react-native';

import { throttle, forEach } from 'lodash';

import * as Cellular from 'expo-cellular';

import {
  addReceivedMessage,
  updateInstantMessages,
  updateStatusOrSeen,
  updateConversation,
} from '~/lib/QueryCache';

class CCable {
  constructor() {
    this.seenChannel = null;
    this.conversationChannels = {};
    this.messageChannels = {};
    this.instantChannels = {};
    this.friendChannels = {};
    this.profileId = null;
  }

  init = () => {
    ActionCable.startDebugging();
    const URL = `${API_URL}cable?token=${AuthToken.get().token}`;

    this.consumer = ActionCable.createConsumer(URL);
    this.cable = new Cable({});

    this.setupSeenChannel();
  };

  setProfileId = (profileId) => {
    this.profileId = profileId;
  };

  onMessage = ({ message }) => {
    addReceivedMessage(message.conversation_id, processMessage(message));
    // Hack to prevent flicker when receiving a fully sent instant message
    updateInstantMessages(message.conversation_id, message);
  };

  onInstant = ({ message }) => {
    updateInstantMessages(message.conversation_id, message);
  };

  subscribeConversation = (conversationId, meProfileId) => {
    if (!conversationId) {
      return;
    }

    this.messageChannels[conversationId] = this.cable.setChannel(
      `message:${conversationId}`,
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

    this.messageChannels[conversationId].on('received', this.onMessage);
    this.instantChannels[conversationId].on('received', this.onInstant);
  };

  unsubscribeConversation = (conversationId) => {
    this.messageChannels[conversationId]?.removeListener(
      'received',
      this.onMessage
    );
    this.messageChannels[conversationId]?.unsubscribe();
    this.instantChannels[conversationId]?.unsubscribe();
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

      this.friendChannels[friendId].on('received', updateStatusOrSeen);
    });
  };

  cleanupFriendChannels = () => {
    forEach(this.friendChannels, (channel) => {
      channel?.removeListener('received', updateStatusOrSeen);
      channel?.unsubscribe();
    });
  };

  setupConversationChannels = (conversationIds) => {
    console.log('subscribing to', conversationIds);
    if (!conversationIds) {
      return;
    }
    conversationIds.forEach((conversationId) => {
      this.conversationChannels[conversationId] = this.cable.setChannel(
        `conversation:${conversationId}`,
        this.consumer.subscriptions.create({
          channel: 'ConversationChannel',
          id: conversationId,
        })
      );

      this.conversationChannels[conversationId].on(
        'received',
        updateConversation
      );
    });
  };

  cleanupConversationChannels = () => {
    forEach(this.conversationChannels, (channel) => {
      channel?.removeListener('received', updateConversation);
      channel?.unsubscribe();
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
    this.netInfoUnsubscribe = NetInfo.addEventListener(this.doSeenUpdate);
    this.batterySubscription = Battery.addBatteryStateListener(
      this.doSeenUpdate
    );
    this.seenInterval = setInterval(this.doSeenUpdate, 15 * 1000);
    this.doSeenUpdate();
  };

  sendInstant = (conversationId, message, qid) => {
    this.instantChannels[conversationId]?.perform('send_instant', {
      message,
      profile_id: this.profileId,
      qid,
    });
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

    if (this.consumer.connection.isOpen()) {
      this.seenChannel?.perform('update_seen', {
        data,
        profile_id: this.profileId,
      });
    }
  }, 1000);

  cleanupSeenChannel = () => {
    clearInterval(this.seenInterval);
    this.netInfoUnsubscribe();
    AppState.removeEventListener('change', this.doSeenUpdate);
    this.batterySubscription?.remove();

    this.seenChannel.unsubscribe();
  };

  disconnect = () => {
    this.cleanupSeenChannel();
    this.consumer.disconnect();
  };
}

const cable = new CCable();

export default cable;
