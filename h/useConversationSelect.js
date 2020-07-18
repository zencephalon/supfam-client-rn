import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { SELECT } from '~/apis/conversation/actions';
import { useFocusEffect } from '@react-navigation/native';

import * as Notifications from 'expo-notifications';

export default function useConversationSelect(conversationId) {
  const dispatch = useDispatch();

  return useEffect(() => {
    (async () => {
      const notifs = await Notifications.getPresentedNotificationsAsync();
      notifs.forEach((notification) => {
        const data = notification.request.content.data;
        const message = data.message || data.body.message;
        const conversation_id = message?.conversation_id;
        if (conversation_id == conversationId) {
          Notifications.dismissNotificationAsync(
            notification.request.identifier
          );
        }
      });
    })();
    dispatch(SELECT(conversationId));

    return () => {
      dispatch(SELECT(null));
    };
  }, [conversationId]);
}
