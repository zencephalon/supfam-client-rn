import * as React from 'react';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupConversationTopBar from '~/c/GroupConversationTopBar';
import EmptyListPlaceholder from '~/c/EmptyListPlaceholder';
import MessagingInterface from '~/c/MessagingInterface';

import useProfileId from '~/h/useProfileId';
import useMarkConversationRead from '~/h/useMarkConversationRead';
import useConversationSelect from '~/h/useConversationSelect';
import useConversation from '~/h/useConversation';

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
