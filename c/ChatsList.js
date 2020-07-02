import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation } from 'react-native';

import ChatItem from '~/c/ChatItem';

import useLight from '~/h/useLight';
import useConversationMemberships from '~/h/useConversationMemberships';
import useGroupConversations from '~/h/useGroupConversations';

const ChatList = (props) => {
  const { status, memberships, error } = useConversationMemberships();
  const { groupConversations } = useGroupConversations();
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
  }, [groupConversations]);
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
