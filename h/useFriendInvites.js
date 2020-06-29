import { useQuery } from 'react-query';
import useProfileId from '~/h/useProfileId';
import { getFriendInvitesFrom, getFriendInvitesTo } from '../apis/api';

export function useFriendInvitesFrom() {
  const profileId = useProfileId();
  const { status, data, error, refetch } = useQuery(
    ['friendInvitesFrom', profileId],
    getFriendInvitesFrom,
    { enabled: profileId }
  );

  return { status, friendInvitesFrom: data || [], error, refetch };
}

export function useFriendInvitesTo() {
  const profileId = useProfileId();
  const { status, data, error, refetch } = useQuery(
    ['friendInvitesTo', profileId],
    getFriendInvitesTo,
    { enabled: profileId }
  );

  return { status, friendInvitesTo: data || [], error, refetch };
}
