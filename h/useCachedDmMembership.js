import { useQuery } from 'react-query';

import { getDmMembership } from '~/apis/api';

export default function useCachedDmMembership(dmId) {
  const { data: dmMembership } = useQuery(
    ['dmMembership', dmId],
    getDmMembership,
    {
      // staleTime: Infinity,
      manual: true,
    }
  );

  return dmMembership;
}
