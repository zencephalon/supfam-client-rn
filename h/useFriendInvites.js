import { useQuery } from 'react-query';
import useProfileId from '~/h/useProfileId';
import { getFriendInvitesFrom, getFriendInvitesTo } from '../apis/api';

export function useFriendInvitesFrom() {
  const profileId = useProfileId();
  const { status, data, error } = useQuery(
    ['friendInvitesFrom', profileId],
    getFriendInvitesFrom,
    {enabled: profileId},
  );

  return { status, friendInvitesFrom: data, error };
}

export function useFriendInvitesTo() {
  const profileId = useProfileId();
  const { status, data, error } = useQuery(
    ['friendInvitesTo', profileId],
    getFriendInvitesTo,
    {enabled: profileId},
  );

  return { status, friendInvitesTo: data, error };
}