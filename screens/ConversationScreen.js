import * as React from 'react';

import { useQuery } from 'react-query';
import { getProfileDmConversation } from '~/apis/api';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import ConversationTopBar from '~/c/ConversationTopBar';
import EmptyListPlaceholder from '~/c/EmptyListPlaceholder';

import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';
import useMarkConversationRead from '~/h/useMarkConversationRead';

export default function ConversationScreen({ navigation, route }) {
  const { profileId } = route.params;

  const meProfileId = useProfileId();

  const profile = useCachedProfile(profileId);

  const { data: conversation } = useQuery(
    ['dmWith', { profileId }],
    getProfileDmConversation,
    {
      enabled: profileId,
    }
  );
  const conversationId = conversation?.id;

  const { fetchMore, canFetchMore, messages } = useMessages(
    conversationId,
    meProfileId
  );

  useMarkConversationRead(conversationId, messages[0]?.id);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={-4}>
      <ConversationTopBar
        profileId={profileId}
        name={profile?.name}
        statusMessage={profile?.status?.message}
        navigation={navigation}
      />
      <EmptyListPlaceholder show={messages.length == 0} text="No messages have been sent yet. Start the conversation!"/>
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
