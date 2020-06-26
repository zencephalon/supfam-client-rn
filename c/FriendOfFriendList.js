import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation } from 'react-native';

import InviteFriendRow from '~/c/InviteFriendRow';
import RespondToInviteRow from '~/c/RespondToInviteRow';

import useLight from '~/h/useLight';
import useFriendsOfFriends from '~/h/useFriendsOfFriends';
import { useFriendInvitesFrom, useFriendInvitesTo } from '~h/useFriendInvites';

const FriendOfFriendList = () => {
  const { friendsOfFriends } = useFriendsOfFriends();
  const { friendInvitesFrom } = useFriendInvitesFrom();
  const { friendInvitesTo } = useFriendInvitesTo();

  let invitableFriends = [];
  friendsOfFriends.forEach((friend) => {
    // Find matching friend invites
    const invitesToFriend = friendInvitesFrom.filter(invite => invite.to_profile_id == friend.id);
    const invitesFromFriend = friendInvitesTo.filter(invite => invite.from_friend.id == friend.id);

    // If there is a "declined" status friend request we will remove this friend from the list
    let declined = false;
    invitesToFriend.forEach((invite) => {
      if(invite.status == 'declined') {
        declined = true;
      }
    });

    friend.type = 'invite';
    invitesFromFriend.forEach((invite) => {
      if(invite.status == 'pending') {
        friend = invite;
        friend.type = 'respond';
      }
    });

    // If there is a "pending" status friend request, we will pass that through so that "cancel invitation" can be shown instead of "invite"
    let inviteSent = false;
    invitesToFriend.forEach((invite) => {
      if(invite.status == 'pending') {
        inviteSent = true;
      }
    });

    friend.inviteSent = inviteSent;
    if(!declined) { invitableFriends.push(friend); }
  });

  const { backgrounds } = useLight();

  const renderInviteRow = React.useCallback(({ item: profileOrInvite }) => {
    if(profileOrInvite.type == 'invite') {
      return <InviteFriendRow profile={profileOrInvite} />;
    } else {
      return <RespondToInviteRow invite={profileOrInvite} />
    }
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: { type: LayoutAnimation.Types.easeInEaseOut },
    });
  }, [invitableFriends]);

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
