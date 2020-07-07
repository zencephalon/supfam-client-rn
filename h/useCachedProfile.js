import { useQuery } from 'react-query';

import { getProfile } from '~/apis/api';

export default function useCachedProfile(profileId) {
  const { data: profile } = useQuery(['friend', profileId], getProfile, {
    // staleTime: Infinity,
    // manual: true,
    staleTime: 60 * 1000,
    enabled: profileId,
  });

  return profile;
}
