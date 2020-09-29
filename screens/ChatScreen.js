import * as React from 'react';

import GroupConversationTopBar from '~/c/GroupConversationTopBar';
import MessagingInterface from '~/c/MessagingInterface';

const placeholderText =
  'No messages have been sent in this group yet. Be the first!';

export default function ChatScreen({ navigation, route }) {
  const { conversationId } = route.params;

  return (
    <MessagingInterface
      conversationId={conversationId}
      emptyPlaceholderText={placeholderText}
      TopBar={<GroupConversationTopBar conversationId={conversationId} />}
    />
  );
}

ChatScreen.navigationOptions = {
  header: null,
};
