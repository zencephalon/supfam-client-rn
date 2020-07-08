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
        const body = response.notification.request.content.data.body;
        const message = body.message;
        const isDm = body.isDm;

        if (isDm) {
          linkTo(`/dm/${message.profile_id}`);
          return;
        }

        linkTo(`/conversation/${message.conversation_id}`);
      }
    );

    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        const body = notification.request.content.data.body;
        const message = body.message;

        return {
          shouldShowAlert: message.conversation_id != conversationId,
          shouldPlaySound: true,
          shouldSetBadge: false,
        };
      },
    });

    return () => {
      subscription.remove();
    };
  }, [conversationId]);
}
