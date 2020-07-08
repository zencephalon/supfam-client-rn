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

import useGroupConversations from '~/h/useGroupConversations';

import ChatItem from '~/c/ChatItem';

import { orderBy } from 'lodash';

const renderProfileOrInvite = ({ item: profileOrInvite }) => {
  if (profileOrInvite.type == 'friend') {
    return <ProfileStatus profile={profileOrInvite} />;
  }

  if (profileOrInvite.type == 'group') {
    return <ChatItem chat={profileOrInvite} />;
  }

  return <RespondToInviteRow invite={profileOrInvite} />;
};

function useFriendListItems(friends, friendInvitesTo, groupConversations) {
  const friendsTyped = (friends || []).map((friend) => {
    return {
      ...friend,
      type: 'friend',
      priority: 1,
    };
  });
  const invitesTyped = (friendInvitesTo || [])
    .filter((invite) => invite.status === 'pending')
    .map((invite) => {
      return {
        ...invite,
        type: 'invite',
        priority: 1,
      };
    });
  const groupsTyped = (groupConversations || []).map((group) => ({
    ...group,
    type: 'group',
    priority: 0,
  }));

  console.log({ groupsTyped });

  return orderBy(
    [...invitesTyped, ...friendsTyped, ...groupsTyped],
    ['priority', 'updated_at'],
    ['desc', 'desc']
  );
}

const FriendList = () => {
  const { backgrounds } = useLight();

  const { friends, refetch, isFetching } = useFriends();
  let { friendInvitesTo, refetch: refetchInvites } = useFriendInvitesTo();
  const {
    groupConversations,
    refetch: refetchGroups,
    isFetching: isFetchinGroups,
  } = useGroupConversations();

  const listItems = useFriendListItems(
    friends,
    friendInvitesTo,
    groupConversations
  );

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
            refreshing={isFetching || isFetchinGroups}
            onRefresh={() => {
              refetch();
              refetchInvites();
              refetchGroups();
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
