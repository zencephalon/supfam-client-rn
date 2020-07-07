import React from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useConversationId from '~/h/useConversationId';

import _ from 'lodash';

import * as Notifications from 'expo-notifications';

export default function useNotificationHandler(containerRef) {
  const conversationId = useConversationId();
  // const navigation = useNavigation();

  React.useEffect(() => {
    const handleNotification = (notification) => {
      // console.log('RECEIVED NOTIFICATION', notification, conversationId);
      if (notification.origin === 'received' && notification.remote) {
        const message = notification?.data?.message;
        if (!message) {
          return;
        }
        if (message.conversation_id === conversationId) {
          return;
        }
        // Notifications.presentLocalNotificationAsync({
        //   title: notification.data.title,
        //   body: notification.data.body,
        //   data: notification.data,
        //   ios: {
        //     _displayInForeground: true,
        //   },
        // });
      }
      if (notification.origin === 'selected' || !notification.remote) {
        const message = notification?.data?.message;

        if (!message) {
          return;
        }

        const isDm = notification?.data?.isDm;

        if (isDm) {
          console.log('going to ', message.profile_id);
          containerRef.current?.navigate('Conversation', {
            profileId: message.profile_id,
          });
        } else {
          containerRef.current?.navigate('Group', {
            conversationId: message.conversation_id,
          });
        }
      }
    };

    // const subscription = Notifications.addListener(handleNotification);

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    return () => {
      // subscription.remove();
    };
  }, [conversationId]);
}
