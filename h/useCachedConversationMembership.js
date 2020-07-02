import { useQuery } from 'react-query';

import { getMembership } from '~/apis/api';

export default function useCachedDmMembership(conversationId) {
  const { data: membership } = useQuery(
    ['conversationMembership', conversationId],
    getMembership,
    {
      // staleTime: Infinity,
      manual: true,
      enabled: conversationId,
    }
  );

  return membership;
}
