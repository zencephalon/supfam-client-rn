import { useQuery } from 'react-query';

import { getDmMembership } from '~/apis/api';

export default function useCachedDmMembership(dmId) {
  const { data: dmIdtoConversationIdMap } = useQuery(
    'dmIdtoConversationIdMap',
    () => {},
    { manual: true }
  );
  const conversationId = dmIdtoConversationIdMap?.[dmId];
  const { data: dmMembership } = useQuery(
    ['conversationMembership', conversationId],
    getDmMembership,
    {
      // staleTime: Infinity,
      manual: true,
      enabled: conversationId,
    }
  );

  return dmMembership;
}
