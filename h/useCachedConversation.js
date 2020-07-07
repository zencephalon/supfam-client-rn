import { useQuery } from 'react-query';

import { getConversation } from '~/apis/api';

export default function useCachedConversation(conversationId) {
  const { data: conversation } = useQuery(
    ['conversation', conversationId],
    getConversation,
    {
      enabled: conversationId,
    }
  );

  return { conversation };
}
