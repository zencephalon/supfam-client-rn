import React from 'react';
import { useQuery, queryCache } from 'react-query';
import { getConversationMemberships } from '~/apis/api';
import { AppState } from 'react-native';

export default function useConversationMemberships() {
  const { status, data, error, refetch } = useQuery(
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
