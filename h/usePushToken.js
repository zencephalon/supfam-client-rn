import React from 'react';

import { getPushToken, setPushToken } from '~/apis/api';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default function usePushToken() {
  React.useEffect(() => {
    const f = async () => {
      const { push_token } = await getPushToken();

      console.log({ push_token });

      if (push_token) {
        return;
      }

      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

      if (status === 'granted') {
        token = await Notifications.getExpoPushTokenAsync();
        setPushToken(token);
      }
    };
    f();
  }, []);
}
