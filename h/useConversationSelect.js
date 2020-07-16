import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { SELECT } from '~/apis/conversation/actions';

import * as Notifications from 'expo-notifications';

export default function useConversationSelect(conversationId) {
  const dispatch = useDispatch();

  return useFocusEffect(() => {
    (async () => {
      const notifs = await Notifications.getPresentedNotificationsAsync();
      console.log("notifs are", notifs);
      notifs.forEach((notification) => {
        const body = notification.request.content.data.body;
        const conversation_id = body.message.conversation_id;
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
