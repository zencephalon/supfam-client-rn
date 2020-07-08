import React from 'react';
import { Platform } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

import useConversationId from '~/h/useConversationId';

import _ from 'lodash';

import * as Notifications from 'expo-notifications';

export default function useNotificationHandler(containerRef) {
  const conversationId = useConversationId();
  const linkTo = useLinkTo();

  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('come to jesus');
        const body = response.notification.request.content.data.body;
        const message = body.message;
        const isDm = body.isDm;

        linkTo(`/dm/${message.profile_id}`);
      }
    );

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    return () => {
      subscription.remove();
    };
  }, [conversationId]);
}
