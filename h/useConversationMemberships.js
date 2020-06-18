import { useQuery, queryCache } from 'react-query';
import { getConversationMemberships } from '~/apis/api';

export default function useConversationMemberships() {
  const { status, data, error } = useQuery(
    'conversationMemberships',
    getConversationMemberships,
    {
      onSuccess: (memberships) => {
        const dmIdtoConversationIdMap = {};
        memberships.map((membership) => {
          queryCache.setQueryData(
            ['conversationMembership', membership.conversation_id],
            membership
          );
          if (membership.dmId) {
            dmIdtoConversationIdMap[membership.dmId] =
              membership.conversation_id;
          }
          // queryCache.setQueryData(
          //   ['conversation', conversation.id],
          //   conversation
          // );
        });
        queryCache.setQueryData(
          'dmIdtoConversationIdMap',
          dmIdtoConversationIdMap
        );
      },
    }
  );

  return { status, conversationMemberships: data, error };
}
