import * as React from 'react';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import ConversationTopBar from '~/c/ConversationTopBar';
import EmptyListPlaceholder from '~/c/EmptyListPlaceholder';

import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';
import useProfileDmConversation from '~/h/useProfileDmConversation';
import useMarkConversationRead from '~/h/useMarkConversationRead';
import useConversationSelect from '~/h/useConversationSelect';
import useConversation from '~/h/useConversation';

export default function ConversationScreen({ navigation, route }) {
  const { profileId } = route.params;

  const meProfileId = useProfileId();

  const profile = useCachedProfile(profileId);

  const { conversation } = useProfileDmConversation(profileId);
  const conversationId = conversation?.id;
  useConversationSelect(conversationId);

  const { fetchMore, canFetchMore, messages } = useMessages(
    conversationId,
    meProfileId
  );
  useConversation(conversationId, meProfileId);

  useMarkConversationRead(conversationId, messages[0]?.id);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={-4}>
      <ConversationTopBar
        profileId={profileId}
        name={profile?.name}
        statusMessage={profile?.status?.message}
      />
      {messages.length == 0 && (
        <EmptyListPlaceholder text="No messages have been sent yet. Start the conversation!" />
      )}
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

ConversationScreen.navigationOptions = {
  header: null,
};
