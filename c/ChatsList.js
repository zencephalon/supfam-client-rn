import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ChatItem from '~/c/ChatItem';
import EmptyListPlaceholder from '~/c/EmptyListPlaceholder';

import useLight from '~/h/useLight';
import useGroupConversations from '~/h/useGroupConversations';
import useSfListAnimation from '~/h/useSfListAnimation';

const renderChatListing = ({ item: chat }) => {
  return <ChatItem chat={chat} />;
};

const ChatList = () => {
  const { groupConversations, refetch, isFetching } = useGroupConversations();
  const { backgrounds } = useLight();

  useSfListAnimation(groupConversations);
  return (
    <>
      <FlatList
        inverted
        data={groupConversations}
        style={{ backgroundColor: backgrounds[0] }}
        renderItem={renderChatListing}
        keyExtractor={(chat) => `${chat.id}`}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      />
      {groupConversations?.length == 0 && (
        <EmptyListPlaceholder text="You have no group chats. Create one by clicking '+' in the upper right." />
      )}
    </>
  );
};

export default ChatList;
