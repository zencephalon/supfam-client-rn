import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation } from 'react-native';

import InviteFriendRow from '~/c/InviteFriendRow';

import useLight from '~/h/useLight';
import useFriendsOfFriends from '~/h/useFriendsOfFriends';
import { useFriendInvitesFrom } from '~h/useFriendInvites';

const FriendOfFriendList = () => {
  const { friendsOfFriends } = useFriendsOfFriends();
  const { friendInvitesFrom } = useFriendInvitesFrom();

  let invitableFriends = [];
  friendsOfFriends.forEach((friend) => {
    // Find matching friend invites
    const friendInvitesTo = friendInvitesFrom.filter(invite => invite.to_profile_id == friend.id);

    // If there is a "declined" status friend request we will remove this friend from the list
    let declined = false;
    friendInvitesTo.forEach((invite) => {
      if(invite.status == 'declined') {
        declined = true;
      }
    });

    // If there is a "pending" status friend request, we will pass that through so that "cancel invitation" can be shown instead of "invite"
    let inviteSent = false;
    friendInvitesTo.forEach((invite) => {
      if(invite.status == 'pending') {
        inviteSent = true;
      }
    });

    friend.inviteSent = inviteSent;
    if(!declined) { invitableFriends.push(friend); }
  });

  const { backgrounds } = useLight();

  const renderInviteRow = React.useCallback(({ item: profile }) => {
    return <InviteFriendRow profile={profile} />;
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
