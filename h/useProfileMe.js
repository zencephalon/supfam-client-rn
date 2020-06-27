import { useQuery, queryCache } from 'react-query';
import useProfileId from '~/h/useProfileId';
import { getProfile } from '~/apis/api';

export default function useProfileMe() {
  const profileId = useProfileId();
  const { data: profile, status } = useQuery(
    ['profileMe', profileId],
    getProfile,
    {
      onSuccess: (profile) => {
        queryCache.setQueryData(['friend', profileId], profile);
      },
      enabled: profileId,
    }
  );

  return { profile, reqState: status };
}
