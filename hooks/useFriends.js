import { useQuery, queryCache } from 'react-query';
import { getFriends } from '~/apis/api';
import { orderBy } from 'lodash';

import useProfileId from '~/hooks/useProfileId';

export default function useFriends() {
  const profileId = useProfileId();
  const { status, data, error } = useQuery(
    profileId && ['friends', profileId],
    getFriends,
    {
      onSuccess: (friends) => {
        friends.map((friend) => {
          queryCache.setQueryData(['friend', friend.id], friend);
        });
      },
    }
  );
  const friends = orderBy(
    data,
    ['status.color', 'updated_at'],
    ['desc', 'desc']
  );

  return { status, friends, error };
}
