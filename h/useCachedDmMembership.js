import { useQuery } from 'react-query';

// import { getProfile } from '~/apis/api';

export default function useCachedDmMembership(dmId) {
  const { data: dmMembership } = useQuery(['dmMembership', dmId], () => {}, {
    staleTime: Infinity,
  });

  return dmMembership;
}
