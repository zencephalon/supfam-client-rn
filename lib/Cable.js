import AuthToken from '~/lib/AuthToken';
import { API_URL } from '~/lib/constants';
import * as Device from 'expo-device';

import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

import { queryCache } from 'react-query';

import * as Battery from 'expo-battery';
import NetInfo from '@react-native-community/netinfo';

import { AppState } from 'react-native';

import { throttle } from 'lodash';

import { sendMessage } from '~/apis/api';

import * as Cellular from 'expo-cellular';

function updateRecievedMessages(conversationId, message) {
  queryCache.setQueryData(
    ['received_messages', { conversationId }],
    (messages) => {
      return [message, ...(messages || [])];
    }
  );
}

function updateInstantMessages(conversationId, message) {
  queryCache.setQueryData(
    ['instant_messages', { conversationId }],
    message
      ? {
          ...message,
          receivedAt: new Date(),
        }
      : null
  );
}

function updateProfiles(profile) {
  queryCache.setQueryData(['friend', profile.id], profile);
  queryCache.setQueryData('friends', (friends) => {
    return friends?.map((friend) =>
      profile.id === friend.id ? profile : friend
    );
  });
}

function updateSeen(friendId, seen) {
  queryCache.setQueryData(['friend', friendId], (profile) => ({
    ...profile,
    seen,
  }));
  queryCache.setQueryData('friends', (friends) => {
    return friends?.map((friend) =>
      friendId === friend.id ? { ...friend, seen } : friend
    );
  });
}

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

    console.log('subscribe', { conversationId }, Device.deviceName);

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
      if (data?.message?.profile_id == meProfileId) {
        return;
      }
      updateRecievedMessages(conversationId, data.message);
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

      this.friendChannels[friendId].on('received', (data) => {
        const { profile, seen } = data;
        if (profile) {
          updateProfiles(profile);
        }
        if (seen) {
          updateSeen(friendId, seen);
        }
      });
    });
  };

  setupSeenChannel = () => {
    this.seenChannel = this.cable.setChannel(
      'seenChannel',
      this.consumer.subscriptions.create({
        channel: 'SeenChannel',
      })
    );

    // AppState.addEventListener('change', this.doSeenUpdate);
    // NetInfo.addEventListener(this.doSeenUpdate);
    // Battery.addBatteryStateListener(this.doSeenUpdate);
    // setInterval(this.doSeenUpdate, 15 * 1000);
  };

  sendInstant = (conversationId, message) => {
    this.instantChannels[conversationId]?.perform('send_instant', { message });
  };

  sendMessage = (meProfileId, conversationId, message) => {
    return sendMessage({
      meProfileId,
      conversationId,
      data: { message },
    }).then((message) => {
      updateRecievedMessages(conversationId, message);
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

    this.seenChannel?.perform('update_seen', { data });
  }, 1000);

  disconnect = () => {
    this.consumer.disconnect();
  };
}

const cable = new CCable();

export default cable;
