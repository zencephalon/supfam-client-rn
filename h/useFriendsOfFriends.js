import { useQuery } from 'react-query';
import { getFriendsOfFriends } from '~/apis/api';
import { orderBy } from 'lodash';

import useProfileId from '~/h/useProfileId';

export default function useFriendsOfFriends() {
  const profileId = useProfileId();
  const { status, data, error, refetch, isFetching } = useQuery(
    profileId && ['friendsOfFriends', profileId],
    getFriendsOfFriends
  );
  const friendsOfFriends = orderBy(
    data,
    ['status.color', 'updated_at'],
    ['desc', 'desc']
  );

  return { status, friendsOfFriends, error, refetch, isFetching };
}
