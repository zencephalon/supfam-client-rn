import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { SELECT } from '~/apis/conversation/actions';

export default function useConversationSelect(conversationId) {
  const dispatch = useDispatch();

  return useEffect(() => {
    dispatch(SELECT(conversationId));

    return () => {
      dispatch(SELECT(null));
    };
  }, [conversationId]);
}
