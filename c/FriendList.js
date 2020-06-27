import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation, RefreshControl } from 'react-native';

import ProfileStatus from '~/c/ProfileStatus';
import RespondToInviteRow from '~/c/RespondToInviteRow';

import useLight from '~/h/useLight';
import useFriends from '~/h/useFriends';
import { useFriendInvitesTo } from '~h/useFriendInvites';

const renderProfileOrInvite = ({ item: profileOrInvite }) => {
  if (profileOrInvite.type == 'friend') {
    return <ProfileStatus profile={profileOrInvite} />;
  } else {
    return <RespondToInviteRow invite={profileOrInvite} />;
  }
};

function useFriendListItems(friends, friendInvitesTo) {
  const friendsTyped = (friends || []).map((friend) => {
    return {
      ...friend,
      type: 'friend',
    };
  });
  const invitesTyped = (friendInvitesTo || [])
    .filter((invite) => invite.status === 'pending')
    .map((invite) => {
      return {
        ...invite,
        type: 'invite',
      };
    });

  return [...friendsTyped, ...invitesTyped];
}

const FriendList = () => {
  const { backgrounds } = useLight();

  const { friends, refetch, isFetching } = useFriends();
  let { friendInvitesTo } = useFriendInvitesTo();

  const listItems = useFriendListItems(friends, friendInvitesTo);

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
      renderItem={renderProfileOrInvite}
      keyExtractor={(item) => `${item.type}${item.id}`}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {
            refetch();
          }}
        />
      }
      onEndReachedThreshold={5}
    />
  );
};

export default FriendList;
