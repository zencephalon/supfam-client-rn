import { useQuery, queryCache } from 'react-query';
import { getConversationsMemberships } from '~/apis/api';

export default function useConversationMemberships() {
  const { status, data, error } = useQuery(
    'conversationMemberships',
    getConversationsMemberships,
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
