import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import InviteFriendRow from '~/c/InviteFriendRow';
import RespondToInviteRow from '~/c/RespondToInviteRow';

import useLight from '~/h/useLight';
import useFriendsOfFriends from '~/h/useFriendsOfFriends';
import useSfListAnimation from '~/h/useSfListAnimation';
import { useFriendInvitesFrom, useFriendInvitesTo } from '~h/useFriendInvites';
import _ from 'lodash';

const renderInviteRow = ({ item: profileOrInvite }) => {
  if (profileOrInvite.type == 'invite') {
    return <InviteFriendRow profile={profileOrInvite} />;
  } else {
    return <RespondToInviteRow invite={profileOrInvite} />;
  }
};

function useInvitableFriends() {
  const { friendsOfFriends } = useFriendsOfFriends();
  const { friendInvitesFrom } = useFriendInvitesFrom();
  const { friendInvitesTo } = useFriendInvitesTo();

  return friendsOfFriends
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
    });
}

const FriendOfFriendList = () => {
  const invitableFriends = useInvitableFriends();

  const { backgrounds } = useLight();

  useSfListAnimation(invitableFriends);

  return (
    <FlatList
      inverted
      data={invitableFriends}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderInviteRow}
      keyExtractor={(profile) => `${profile.id}`}
    />
  );
};

export default FriendOfFriendList;
