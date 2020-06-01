import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation } from 'react-native';

import ChatItem from '~/c/ChatItem';

import useLight from '~/h/useLight';
import useChats from '~/h/useChats';

const ChatList = (props) => {
  const { status, chats, error } = useChats();

  const { backgrounds } = useLight();

  const renderChatListing = React.useCallback(({ item: chat }) => {
    return <ChatItem chat={chat} />;
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
  }, [chats]);

  return (
    <FlatList
      inverted
      data={chats}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderChatListing}
      keyExtractor={(profile) => `${profile.id}`}
    />
  );
};

export default ChatList;
