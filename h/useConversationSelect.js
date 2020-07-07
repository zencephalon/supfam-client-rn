import { useDispatch } from 'react-redux';

import { SELECT } from '~/apis/conversation/actions';

export default function useConversationSelect() {
  const dispatch = useDispatch();

  return (conversationId) => {
    dispatch(SELECT(conversationId));
  };
}
