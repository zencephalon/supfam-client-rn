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
    conversationId,
    meProfileId
  );

  useMarkConversationRead(conversationId, messages[0]?.id);

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
      <MessageInput conversationId={conversationId} />
    </SfKeyboardAvoidingView>
  );
}

ChatScreen.navigationOptions = {
  header: null,
};
