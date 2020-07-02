import { useQuery, queryCache } from 'react-query';
import { getGroupConversations } from '~/apis/api';

export default function useGroupConversations() {
  const { status, data, error, refetch } = useQuery(
    'groupConversations',
    getGroupConversations,
    {
      onSuccess: (conversations) => {
        conversations.forEach((conversation) => {
          queryCache.setQueryData(
            ['groupConversation', conversation.id],
            conversation
          );
        });
      },
    }
  );

  return { status, groupConversations: data, error };
}
