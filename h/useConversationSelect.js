import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { SELECT } from '~/apis/conversation/actions';

import * as Notifications from 'expo-notifications';

export default function useConversationSelect(conversationId) {
  const dispatch = useDispatch();

  return useEffect(() => {
    (async () => {
      const notifs = await Notifications.getPresentedNotificationsAsync();
      notifs.forEach((notification) => {
        const data = notification.request.content.data;
        const conversation_id = data.message.conversation_id;
        if(conversation_id == conversationId) {
          Notifications.dismissNotificationAsync(notification.request.identifier);
        }
      })
    })();

    dispatch(SELECT(conversationId));

    return () => {
      dispatch(SELECT(null));
    };
  }, [conversationId]);
}
