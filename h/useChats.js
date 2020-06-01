import { useQuery, queryCache } from 'react-query';
import { getFriends } from '~/apis/api';
import { orderBy } from 'lodash';

import useProfileId from '~/h/useProfileId';

export default function useChats() {
  const profileId = useProfileId();
  const { status, data, error } = useQuery(
    profileId && ['chats', profileId],
    getConversationsMe,
    {
      // onSuccess: (friends) => {
      //   friends.map((friend) => {
      //     queryCache.setQueryData(['friend', friend.id], friend);
      //   });
      // },
    }
  );
  // const friends = orderBy(
  //   data,
  //   ['status.color', 'updated_at'],
  //   ['desc', 'desc']
  // );

  return { status, friends: data, error };
}
