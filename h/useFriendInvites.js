import { useQuery } from 'react-query';
import _ from 'lodash';
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

export function useHasInvitedFriend(toProfileId) {
  const { friendInvitesFrom } = useFriendInvitesFrom();

  const invites = friendInvitesFrom.filter(
    (invite) => invite.to_profile_id == toProfileId
  );

  return _.some(
    invites,
    (invite) => invite.status === 'pending'
  );
}

export function useHasInviteFromFriend(fromProfileId) {
  const { friendInvitesTo } = useFriendInvitesTo();
  const invites = friendInvitesTo.filter(
    (invite) => invite.from_friend.id == fromProfileId
  );

  return _.some(
    invites,
    (invite) => invite.status === 'pending'
  );
}
