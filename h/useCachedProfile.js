import { useQuery } from 'react-query';

export default function useCachedProfile(profileId) {
  const { data: profile } = useQuery(['friend', profileId], () => {}, {
    staleTime: Infinity,
  });

  return profile;
}
