import * as React from 'react';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupConversationTopBar from '~/c/GroupConversationTopBar';
import EmptyListPlaceholder from '~/c/EmptyListPlaceholder';

import useProfileId from '~/h/useProfileId';
import useMarkConversationRead from '~/h/useMarkConversationRead';
import useConversationSelect from '~/h/useConversationSelect';
import useConversation from '~/h/useConversation';

export default function ChatScreen({ navigation, route }) {
  const { conversationId } = route.params;

  const meProfileId = useProfileId();

  const { messages, fetchMore, canFetchMore, loading } = useConversation(
    conversationId,
    meProfileId
  );
  useConversationSelect(conversationId);

  useMarkConversationRead(conversationId, messages[0]?.id);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={-4}>
      <GroupConversationTopBar conversationId={conversationId} />
      {!loading && messages.length == 0 && (
        <EmptyListPlaceholder text="No messages have been sent in this group yet. Be the first!" />
      )}
      <MessageList
        messages={messages}
        meProfileId={meProfileId}
        fetchMore={fetchMore}
        canFetchMore={canFetchMore}
        loading={loading}
      />
      <MessageInput conversationId={conversationId} />
    </SfKeyboardAvoidingView>
  );
}

ChatScreen.navigationOptions = {
  header: null,
};
