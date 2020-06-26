import { useQuery } from 'react-query';
import useProfileId from '~/h/useProfileId';
import { getFriendInvitesFrom, getFriendInvitesTo } from '../apis/api';

export function useFriendInvitesFrom() {
  const profileId = useProfileId();
  const { status, data, error } = useQuery(
    profileId && ['friendInvitesFrom', profileId],
    getFriendInvitesFrom
  );

  return { status, friendInvitesFrom: data, error };
}

export function useFriendInvitesTo() {
  const profileId = useProfileId();
  const { status, data, error } = useQuery(
    profileId && ['friendInvitesTo', profileId],
    getFriendInvitesTo
  );

  return { status, friendInvitesTo: data, error };
}