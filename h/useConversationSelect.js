import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { SELECT } from '~/apis/conversation/actions';

export default function useConversationSelect(conversationId) {
  const dispatch = useDispatch();

  return useEffect(() => {
    console.log('SELECTING CONVERSATION', conversationId);
    dispatch(SELECT(conversationId));

    return () => {
      dispatch(SELECT(null));
    };
  }, [conversationId]);
}
