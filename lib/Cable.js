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

    this.seenChannel = this.cable.setChannel(
      'seen',
      this.consumer.subscriptions.create({
        channel: 'SeenChannel',
      })
    );

    // Gotta deal with this properly soon.
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

    AppState.addEventListener('change', this.doSeenUpdate);
    NetInfo.addEventListener(this.doSeenUpdate);
    Battery.addBatteryStateListener(this.doSeenUpdate);

    setInterval(this.doSeenUpdate, 30 * 1000);
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
