import AuthToken from '~/lib/AuthToken';
import { CABLE_URL } from '~/lib/constants';
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
  removeInstantMessage,
  updateStatusOrSeen,
  updateConversation,
  updateConversationPresence,
  updateMessageReactions,
} from '~/lib/QueryCache';

class CCable {
  constructor() {
    this.seenChannel = null;
    this.conversationChannel = null;
    this.conversationPresenceChannels = {};
    this.conversationPresenceIntervals = {};
    this.messageChannels = {};
    this.messageReactionsChannels = {};
    this.instantChannels = {};
    this.friendChannel = null;
    this.profileId = null;
  }

  init = () => {
    ActionCable.startDebugging();
    const URL = `${CABLE_URL}?token=${AuthToken.get().token}`;

    this.consumer = ActionCable.createConsumer(URL);
    this.cable = new Cable({});

    this.setupSeenChannel();
  };

  setProfileId = (profileId) => {
    this.profileId = profileId;
  };

  onMessage = ({ message }) => {
    addReceivedMessage(message.conversation_id, processMessage(message));
    // Hack to make an instant message look fully sent when we receive it, instead of saying 'paused'
    removeInstantMessage(message.conversation_id, `i-${message.profile_id}`);
  };

  onInstant = ({ message }) => {
    if (message) {
      updateInstantMessages(message.conversation_id, message);
    }
  };

  onMessageReaction = ({ id, reactions }) => {
    updateMessageReactions(id, reactions);
  };

  onConversationPresence = ({ event, profile_id, conversation_id }) => {
    updateConversationPresence(event, profile_id, conversation_id);
  };

  subscribeConversation = (conversationId) => {
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
    this.messageReactionsChannels[conversationId] = this.cable.setChannel(
      `messageReactions:${conversationId}`,
      this.consumer.subscriptions.create({
        channel: 'MessageReactionsChannel',
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
    this.messageReactionsChannels[conversationId].on(
      'received',
      this.onMessageReaction
    );
    this.instantChannels[conversationId].on('received', this.onInstant);
  };

  unsubscribeConversation = (conversationId) => {
    this.messageChannels[conversationId]?.removeListener(
      'received',
      this.onMessage
    );
    this.messageReactionsChannels[conversationId]?.removeListener(
      'received',
      this.onMessageReaction
    );
    this.instantChannels[conversationId]?.removeListener(
      'received',
      this.onInstant
    );
    this.messageChannels[conversationId]?.unsubscribe();
    this.messageReactionsChannels[conversationId]?.unsubscribe();
    this.instantChannels[conversationId]?.unsubscribe();
  };

  subscribeConversationPresence = (conversationId, profileId) => {
    if (!conversationId) {
      return;
    }

    this.conversationPresenceChannels[conversationId] = this.cable.setChannel(
      `presence:${conversationId}`,
      this.consumer.subscriptions.create({
        channel: 'ConversationPresenceChannel',
        id: conversationId,
        profile_id: profileId,
      })
    );

    this.conversationPresenceChannels[conversationId].on(
      'received',
      this.onConversationPresence
    );
    this.conversationPresenceIntervals[conversationId] = setInterval(() => {
      this.conversationPresenceChannels[conversationId]?.perform(
        'heartbeat',
        {}
      );
    }, 5000);
  };

  unsubscribeConversationPresence = (conversationId) => {
    clearInterval(this.conversationPresenceIntervals[conversationId]);
    this.conversationPresenceChannels[conversationId]?.removeListener(
      'received',
      this.onConversationPresence
    );
    this.conversationPresenceChannels[conversationId]?.unsubscribe();
  };

  setupFriendChannel = () => {
    this.friendChannel = this.cable.setChannel(
      `friend`,
      this.consumer.subscriptions.create({
        channel: 'ProfileChannel',
      })
    );

    this.friendChannel.on('received', updateStatusOrSeen);
  };

  cleanupFriendChannel = () => {
    this.friendChannel.removeListener('received', updateStatusOrSeen);
    this.friendChannel.unsubscribe();
  };

  setupConversationChannel = () => {
    this.conversationChannel = this.cable.setChannel(
      `conversationPreviews`,
      this.consumer.subscriptions.create({
        channel: 'ConversationChannel',
      })
    );

    this.conversationChannel.on('received', updateConversation);
  };

  cleanupConversationChannels = () => {
    this.conversationChannel?.removeListener('received', updateConversation);
    this.conversationChannel?.unsubscribe();
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
