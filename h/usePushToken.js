import React from 'react';

import { getPushToken, setPushToken } from '~/apis/api';

import * as Notifications from 'expo-notifications';

import * as Permissions from 'expo-permissions';

export default function usePushToken() {
  React.useEffect(() => {
    const f = async () => {
      const settings = await Notifications.getPermissionsAsync();

      if (settings.granted || settings.ios?.status === 'provisional') {
        token = await Notifications.getExpoPushTokenAsync({
          experienceId: '@zencephalon/Supfam',
        });
        setPushToken(token);
      }
    };
    f();
  }, []);
}
