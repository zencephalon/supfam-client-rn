import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import { useQuery } from 'react-query';
import { sendUserDmMessage, getProfileDmConversation } from '~/apis/api';

import statusColors from '~/constants/statusColors';

import { throttle } from 'lodash';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';

import useLight from '~/h/useLight';
import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';

import Cable from '~/lib/Cable';

const sendInstant = throttle((conversationId, message) => {
  Cable.sendInstant(conversationId, message);
}, 50);

export default function ConversationScreen({ navigation, route }) {
  const [text, setText] = React.useState('');
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

  const { backgrounds } = useLight();

  const submitMessage = React.useCallback(async () => {
    if (text === '') {
      return;
    }
    sendInstant(conversationId, text);
    sendUserDmMessage({
      meProfileId,
      profileId,
      data: { message: { message: text, type: 0 } },
    }).then(() => {
      setText('');
    });
  }, [text, profileId]);

  const setMessage = React.useCallback(
    (text) => {
      setText(text);
      sendInstant(conversationId, text);
    },
    [conversationId]
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
      <MessageInput
        message={text}
        setMessage={setMessage}
        submitMessage={submitMessage}
      />
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
  statusInput: {
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 0,
    paddingBottom: 4,
  },
  // statusInput: {
  //   marginTop: 8,
  //   padding: 12,
  //   fontSize: 16,
  //   borderRadius: 0,
  //   borderWidth: 0,
  //   marginBottom: -1,
  // },
});
