import useFriendsOfFriends from '~/h/useFriendsOfFriends';
import { useFriendInvitesFrom, useFriendInvitesTo } from '~h/useFriendInvites';
import _ from 'lodash';

export default function useInvitableFriends() {
  const {
    friendsOfFriends,
    isFetching: isFetchingFriendsOfFriends,
    refetch: refetchFriendsOfFriends,
  } = useFriendsOfFriends();
  const {
    friendInvitesFrom,
    isFetching: isFetchingFriendInvitesFrom,
    refetch: refetchFriendInvitesFrom,
  } = useFriendInvitesFrom();
  const {
    friendInvitesTo,
    isFetching: isFetchingFriendInvitesTo,
    refetch: refetchFriendInvitesTo,
  } = useFriendInvitesTo();

  return {
    isFetching:
      isFetchingFriendsOfFriends ||
      isFetchingFriendInvitesFrom ||
      isFetchingFriendInvitesTo,
    refetch: () => {
      refetchFriendsOfFriends();
      refetchFriendInvitesFrom();
      refetchFriendInvitesTo();
    },
    friends: friendsOfFriends
      .filter((friend) => {
        // Find matching friend invites
        const invitesToFriend = friendInvitesFrom.filter(
          (invite) => invite.to_profile_id == friend.id
        );
        const declined = _.some(
          invitesToFriend,
          (invite) => invite.status === 'declined'
        );

        // If there is a "declined" status friend request we will remove this friend from the list
        return !declined;
      })
      .map((friend) => {
        const invitesFromFriend = friendInvitesTo.filter(
          (invite) => invite.from_friend.id == friend.id
        );

        const hasInvite = _.some(
          invitesFromFriend,
          (invite) => invite.status == 'pending'
        );

        // If there is an invite, let the user respond to it
        if (hasInvite) {
          return {
            ...friend,
            type: 'respond',
          };
        }

        const invitesToFriend = friendInvitesFrom.filter(
          (invite) => invite.to_profile_id == friend.id
        );

        // If there is a "pending" status friend request, we will pass that through so that "cancel invitation" can be shown instead of "invite"
        const inviteSent = _.some(
          invitesToFriend,
          (invite) => invite.status === 'pending'
        );

        return {
          ...friend,
          type: 'invite',
          inviteSent,
        };
      }),
  };
}
