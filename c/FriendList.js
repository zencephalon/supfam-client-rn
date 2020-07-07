import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { RefreshControl } from 'react-native';

import ProfileStatus from '~/c/ProfileStatus';
import RespondToInviteRow from '~/c/RespondToInviteRow';
import EmptyListPlaceholder from '~/c/EmptyListPlaceholder';

import useLight from '~/h/useLight';
import useFriends from '~/h/useFriends';
import { useFriendInvitesTo } from '~/h/useFriendInvites';
import useSfListAnimation from '~/h/useSfListAnimation';

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
  let { friendInvitesTo, refetch: refetchInvites } = useFriendInvitesTo();

  const listItems = useFriendListItems(friends, friendInvitesTo);

  useSfListAnimation(listItems);

  return (
    <>
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
              refetchInvites();
            }}
          />
        }
        onEndReachedThreshold={5}
      />
      {!isFetching && listItems?.length == 0 && (
        <EmptyListPlaceholder text="You aren't connected to anyone on Supfam yet. Add your friends using the button in the upper right." />
      )}
    </>
  );
};

export default FriendList;
