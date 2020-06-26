import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation } from 'react-native';

import ProfileStatus from '~/c/ProfileStatus';
import RespondToInviteRow from '~/c/RespondToInviteRow';

import useLight from '~/h/useLight';
import useFriends from '~/h/useFriends';
import { useFriendInvitesTo } from '~h/useFriendInvites';

const FriendList = () => {
  const { friends } = useFriends();
  const { friendInvitesTo } = useFriendInvitesTo();

  const friendsTyped = friends.map((friend) => {
    friend.type = 'friend';
    return friend;
  });
  let invitesTyped = [];
  if(friendInvitesTo) {
    invitesTyped = friendInvitesTo.map((invite) => {
      invite.type = 'invite';
      return invite;
    })
  }
  const listItems = [...friendsTyped, ...invitesTyped];

  const { backgrounds } = useLight();

  const renderProfileStatus = React.useCallback(({ item: profileOrInvite }) => {
    if(profileOrInvite.type == 'friend') {
      return <ProfileStatus profile={profileOrInvite} />;
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
  }, [listItems]);

  return (
    <FlatList
      inverted
      data={listItems}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderProfileStatus}
      keyExtractor={(profile) => `${profile.type}${profile.id}`}
    />
  );
};

export default FriendList;
