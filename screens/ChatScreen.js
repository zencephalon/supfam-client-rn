import * as React from 'react';

import statusColors from '~/constants/statusColors';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';

import useCachedConversation from '~/h/useCachedConversation';
import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';

export default function ChatScreen({ navigation, route }) {
  const { conversation } = route.params;

  const meProfileId = useProfileId();

  // const conversation = useCachedConversation(conversationId);

  navigation.setOptions({
    headerTitle: conversation.name,
    headerStyle: {
      backgroundColor: statusColors[0],
    },
  });

  const { fetchMore, canFetchMore, messages } = useMessages(
    conversation.id,
    meProfileId
  );

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={54}>
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
