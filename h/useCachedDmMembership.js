import { useQuery } from 'react-query';

import { getMembership } from '~/apis/api';

export default function useCachedDmMembership(dmId) {
  const { data: dmIdtoConversationIdMap } = useQuery(
    'dmIdtoConversationIdMap',
    () => {},
    { manual: true, staleTime: Infinity }
  );
  const conversationId = dmIdtoConversationIdMap?.[dmId];
  const { data: dmMembership } = useQuery(
    ['conversationMembership', conversationId],
    getMembership,
    {
      // staleTime: Infinity,
      manual: true,
      enabled: conversationId,
    }
  );

  return dmMembership;
}
