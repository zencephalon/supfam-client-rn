import { useQuery } from 'react-query';
import { getFriends } from '~/apis/api';
import { updateCachedProfile } from '~/lib/QueryCache';

import useProfileId from '~/h/useProfileId';

export default function useFriends() {
  const profileId = useProfileId();
  const { status, data, error, isFetching, refetch } = useQuery(
    ['friends'],
    () => getFriends(profileId),
    {
      onSuccess: (friends) => {
        friends.forEach((friend) => {
          updateCachedProfile(friend.id, () => friend);
        });
      },
      enabled: profileId,
    }
  );
  // const friends = orderBy(
  //   data,
  //   ['status.color', 'updated_at'],
  //   ['desc', 'desc']
  // );

  return { status, friends: data || [], error, isFetching, refetch };
}

export function useFriendIds() {
  const { status, friends, error, isFetching, refetch } = useFriends();

  return {
    status,
    friendIds: friends.map((f) => f.id),
    error,
    isFetching,
    refetch,
  };
}
