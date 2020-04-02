import { useQuery, queryCache } from 'react-query';
import { getFriends } from '~/apis/api';
import { orderBy } from 'lodash';

export default function useFriends() {
  const { status, data, error } = useQuery('friends', getFriends, {
    onSuccess: friends => {
      friends.map(friend => {
        queryCache.setQueryData(['friend', friend.id], friend);
      });
    },
  });
  const friends = orderBy(
    data,
    ['current_status.color', 'current_status.updated_at'],
    ['desc', 'desc']
  );

  return { status, friends, error };
}
