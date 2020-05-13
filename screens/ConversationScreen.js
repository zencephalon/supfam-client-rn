import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import { useQuery } from 'react-query';
import { getProfileDmConversation } from '~/apis/api';

import statusColors from '~/constants/statusColors';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';

import useLight from '~/h/useLight';
import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';

export default function ConversationScreen({ navigation, route }) {
  const { backgrounds } = useLight();
  const { profileId } = route.params;

  const meProfileId = useProfileId();

  const profile = useCachedProfile(profileId);

  const { data: conversation } = useQuery(
    ['dmWith', { profileId }],
    getProfileDmConversation
  );
  const conversationId = conversation?.id;

  const { fetchMore, canFetchMore, messages } = useMessages(
    conversationId,
    meProfileId
  );

  navigation.setOptions({
    headerTitle: profile?.name,
    headerStyle: {
      backgroundColor: statusColors[profile?.status?.color || 0],
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, backgroundColor: backgrounds[0] }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={68}
    >
      <MessageList
        messages={messages}
        meProfileId={meProfileId}
        fetchMore={fetchMore}
        canFetchMore={canFetchMore}
      />
      <MessageInput conversationId={conversationId} />
    </KeyboardAvoidingView>
  );
}

ConversationScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
