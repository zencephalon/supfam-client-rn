import { useQuery, queryCache } from 'react-query';
import { getConversationMemberships } from '~/apis/api';

export default function useConversationMemberships() {
  const { status, data, error } = useQuery(
    'conversationMemberships',
    getConversationMemberships,
    {
      onSuccess: (memberships) => {
        memberships.map((membership) => {
          queryCache.setQueryData(
            ['dmMembership', membership.conversation?.dmId],
            membership
          );
          // queryCache.setQueryData(
          //   ['conversation', conversation.id],
          //   conversation
          // );
        });
      },
    }
  );

  return { status, conversationMemberships: data, error };
}
