import React from 'react';
import { Notifications } from 'expo';

import _ from 'lodash';

export default function useNotificationHandler(containerRef) {
  React.useEffect(() => {
    const handleNotification = (notification) => {
      console.log(
        'RECEIVED NOTIFICATION',
        notification,
        containerRef?.current?.getRootState()
      );
      if (notification.origin === 'received' && notification.remote) {
        const navState = containerRef?.current?.getRootState();
        const currentRoute = _.last(navState.routes);
        const message = notification?.data?.message;
        if (!message) {
          return;
        }
        if (
          currentRoute.name === 'Conversation' &&
          currentRoute.params.profileId === message.profile_id
        ) {
          return;
        }
        Notifications.presentLocalNotificationAsync({
          title: notification.data.title,
          body: notification.data.body,
          data: notification.data,
          ios: {
            _displayInForeground: true,
          },
        });
      }
      if (notification.origin === 'selected' || !notification.remote) {
        const message = notification?.data?.message;
        if (message) {
          containerRef.current?.navigate('Conversation', {
            profileId: message.profile_id,
          });
        }
      }
    };

    const subscription = Notifications.addListener(handleNotification);

    return () => {
      subscription.remove();
    };
  }, []);
}
