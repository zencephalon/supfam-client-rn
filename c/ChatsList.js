import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ChatItem from '~/c/ChatItem';

import useLight from '~/h/useLight';
import useGroupConversations from '~/h/useGroupConversations';
import useSfListAnimation from '~/h/useSfListAnimation';

const renderChatListing = ({ item: chat }) => {
  return <ChatItem chat={chat} />;
};

const ChatList = (props) => {
  const { groupConversations } = useGroupConversations();
  const { backgrounds } = useLight();

  useSfListAnimation(groupConversations);

  return (
    <FlatList
      inverted
      data={groupConversations}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderChatListing}
      keyExtractor={(profile) => `${profile.id}`}
    />
  );
};

export default ChatList;
