import * as React from 'react';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupConversationTopBar from '~/c/GroupConversationTopBar';

import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';
import useMarkConversationRead from '~/h/useMarkConversationRead';

import { useQuery } from 'react-query';
import { getConversation } from '~/apis/api';

export default function ChatScreen({ navigation, route }) {
  // We probably want to only get the id here and load the conversation
  // from queryCache in the future
  const { conversationId } = route.params;

  const meProfileId = useProfileId();

  const { data: conversation } = useQuery(
    ['groupConversation', { conversationId }],
    getConversation,
    {
      enabled: conversationId,
    }
  );

  const { fetchMore, canFetchMore, messages } = useMessages(
    conversation.id,
    meProfileId
  );

  useMarkConversationRead(conversation.id, messages[0]?.id);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={-4}>
      <GroupConversationTopBar
        conversation={conversation}
        navigation={navigation}
      />
      <MessageList
        messages={messages}
        meProfileId={meProfileId}
        fetchMore={fetchMore}
        canFetchMore={canFetchMore}
      />
      <MessageInput conversationId={conversation.id} />
    </SfKeyboardAvoidingView>
  );
}

ChatScreen.navigationOptions = {
  header: null,
};
