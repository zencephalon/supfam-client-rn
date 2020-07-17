import React from 'react';

import { getPushToken, setPushToken } from '~/apis/api';

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function usePushToken() {
  React.useEffect(() => {
    const f = async () => {
      if (!Constants.isDevice) {
        return;
      }

      const settings = await Notifications.getPermissionsAsync();

      if (!settings.granted && settings.ios?.status !== 'provisional') {
        return;
      }

      try {
        const { data: token } = await Notifications.getExpoPushTokenAsync({
          experienceId: '@zencephalon/Supfam',
        });
        setPushToken(token);
      } catch (e) {
        console.log('Error getting push token', e);
      }
    };
    f();
  }, []);
}
