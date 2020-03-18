import AuthToken from '~/lib/AuthToken';
import { API_URL } from '~/lib/constants';

import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

import { queryCache } from 'react-query';

import * as Battery from 'expo-battery';

import { putSeenMe } from '~/apis/api';

import { AppState } from 'react-native';

const doSeenUpdate = async () => {
  const {
    batteryLevel: battery,
    batteryState: battery_state,
  } = await Battery.getPowerStateAsync();

  console.log({ battery, battery_state });

  putSeenMe({ battery, battery_state });
};

class CCable {
  init = () => {
    ActionCable.startDebugging();
    const URL = `${API_URL}cable?token=${AuthToken.get()}`;

    this.consumer = ActionCable.createConsumer(URL);
    this.cable = new Cable({});
    this.channel = this.cable.setChannel(
      'family',
      this.consumer.subscriptions.create({
        channel: 'FamilyChannel',
        id: 1,
      })
    );

    this.channel.on('received', data => {
      // console.log('received', data);
      const { user } = data;
      queryCache.setQueryData('friends', friends => {
        return friends.map(friend => (user.id === friend.id ? user : friend));
      });
    });
    this.channel.on('connected', data => {
      console.log('connected', data);
    });
    this.channel.on('rejected', data => {
      console.log('rejected', data);
    });
    this.channel.on('disconnected', data => {
      console.log('disconnected', data);
    });

    AppState.addEventListener('change', () => {
      console.log('appstate changed');
      doSeenUpdate();
    });

    setInterval(() => {
      doSeenUpdate();
    }, 30 * 1000);
  };

  disconnect = () => {
    this.consumer.disconnect();
  };
}

const cable = new CCable();

export default cable;
