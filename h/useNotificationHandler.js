import React from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLinkTo } from '@react-navigation/native';

import { Linking as nativeLinking } from 'react-native';
import * as Linking from 'expo-linking';

import useConversationId from '~/h/useConversationId';

import _ from 'lodash';

import * as Notifications from 'expo-notifications';

export default function useNotificationHandler(containerRef) {
  const conversationId = useConversationId();
  // const navigation = useNavigation();
  const linkTo = useLinkTo();

  React.useEffect(() => {
    // const subscription = Notifications.addListener(handleNotification);

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('come to jesus');
        // const url = response.notification.request.content.data.url;
        const body = response.notification.request.content.data.body;
        const message = body.message;
        const isDm = body.isDm;

        console.log('Does this even work?');
        const url = Linking.makeUrl(`/dm/${message.profile_id}`);
        console.log({ url, base: Linking.makeUrl('/') });

        linkTo(`/dm/${message.profile_id}`);

        // nativeLinking.openURL(url);
        // nativeLinking.openURL(Linking.makeUrl('ahhhh'));
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
