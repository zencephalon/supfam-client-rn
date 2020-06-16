import * as React from 'react';

import { useQuery } from 'react-query';
import { getProfileDmConversation } from '~/apis/api';

import statusColors from '~/constants/statusColors';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';

import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';
import useMarkConversationRead from '~/h/useMarkConversationRead';

export default function ConversationScreen({ navigation, route }) {
  const { profileId } = route.params;

  const meProfileId = useProfileId();

  const profile = useCachedProfile(profileId);

  navigation.setOptions({
    headerTitle: profile?.name,
    headerStyle: {
      backgroundColor: statusColors[profile?.status?.color || 0],
    },
  });

  const { data: conversation } = useQuery(
    ['dmWith', { profileId }],
    getProfileDmConversation
  );
  const conversationId = conversation?.id;

  const { fetchMore, canFetchMore, messages } = useMessages(
    conversationId,
    meProfileId
  );

  useMarkConversationRead(conversationId);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={104}>
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
