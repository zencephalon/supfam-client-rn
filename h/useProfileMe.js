import { useQuery } from 'react-query';
import useProfileId from '~/h/useProfileId';
import { getProfile } from '~/apis/api';
import { updateCachedProfile } from '~/lib/QueryCache';

export default function useProfileMe() {
  const profileId = useProfileId();
  const { data: profile, status } = useQuery(
    ['profileMe', profileId],
    getProfile,
    {
      onSuccess: (profile) => {
        updateCachedProfile(profileId, () => profile);
      },
      enabled: profileId,
    }
  );

  return { profile, reqState: status };
}
