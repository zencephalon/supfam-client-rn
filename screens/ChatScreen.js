import * as React from 'react';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupConversationTopBar from '~/c/GroupConversationTopBar';
import EmptyListPlaceholder from '~/c/EmptyListPlaceholder';

import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';
import useMarkConversationRead from '~/h/useMarkConversationRead';
import useCachedConversation from '~/h/useCachedConversation';
import useConversationSelect from '~/h/useConversationSelect';
import useConversation from '~/h/useConversation';

export default function ChatScreen({ navigation, route }) {
  const { conversationId } = route.params;
  useConversationSelect(conversationId);

  const meProfileId = useProfileId();

  const conversation = useCachedConversation(conversationId);

  const { messages, fetchMore, canFetchMore, loading } = useConversation(
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
