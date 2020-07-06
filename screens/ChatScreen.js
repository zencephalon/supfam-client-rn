import * as React from 'react';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupConversationTopBar from '~/c/GroupConversationTopBar';
import EmptyChatPlaceholder from '~/c/EmptyChatPlaceholder';

import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';
import useMarkConversationRead from '~/h/useMarkConversationRead';
import useCachedConversation from '~/h/useCachedConversation';

export default function ChatScreen({ navigation, route }) {
  const { conversationId } = route.params;

  const meProfileId = useProfileId();

  const { conversation } = useCachedConversation(conversationId);

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
      <EmptyChatPlaceholder show={messages.length == 0} text="No messages have been sent in this group yet. Be the first!"/>
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
