import * as React from 'react';

import statusColors from '~/constants/statusColors';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupConversationTopBar from '~/c/GroupConversationTopBar';

import useCachedConversation from '~/h/useCachedConversation';
import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';
import useLight from '~/h/useLight';
import useMarkConversationRead from '~/h/useMarkConversationRead';

export default function ChatScreen({ navigation, route }) {
  const { conversation } = route.params;

  const { backgrounds } = useLight();

  const meProfileId = useProfileId();

  // const conversation = useCachedConversation(conversationId);

  const { fetchMore, canFetchMore, messages } = useMessages(
    conversation.id,
    meProfileId
  );

  useMarkConversationRead(conversation.id, messages[0]?.id);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={54}>
      <GroupConversationTopBar
        name={conversation.name}
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
