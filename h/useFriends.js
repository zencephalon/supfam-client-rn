import React from 'react';

import { useQuery, queryCache } from 'react-query';
import { getFriends } from '~/apis/api';
import { orderBy } from 'lodash';

import useProfileId from '~/h/useProfileId';

export default function useFriends() {
  const profileId = useProfileId();
  const { status, data, error, isFetching } = useQuery(
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

  const invalidate = React.useCallback(() => {
    queryCache.invalidate(['friends', profileId]);
  }, [profileId]);

  return { status, friends, error, isFetching, invalidate };
}
