import { useQuery, queryCache } from 'react-query';
import { getGroupConversations } from '~/apis/api';

export default function useGroupConversations() {
  const { status, data, error, isFetching, refetch } = useQuery(
    'groupConversations',
    getGroupConversations,
    {
      onSuccess: (conversations) => {
        conversations.forEach((conversation) => {
          queryCache.setQueryData(
            ['conversation', conversation.id],
            conversation
          );
        });
      },
    }
  );

  return { status, groupConversations: data, error, isFetching, refetch };
}
