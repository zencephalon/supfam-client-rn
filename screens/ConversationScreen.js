import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import { useQuery, useMutation } from 'react-query';
import { getUserDmMessages, sendUserDmMessage } from '~/apis/api';

import statusColors from '~/constants/statusColors';

import { useSelector } from 'react-redux';

import Cable from '~/lib/Cable';

import { throttle } from 'lodash';
import MessageList from '~/c/MessageList';

import SfTextInput from '~/c/SfTextInput';

import useLight from '~/h/useLight';
import useCachedProfile from '~/h/useCachedProfile';

const sendInstant = throttle((conversationId, message) => {
  Cable.sendInstant(conversationId, message);
}, 50);

export default function ConversationScreen({ navigation, route }) {
  const [text, setText] = React.useState('');
  const { profileId } = route.params;

  const me = useSelector((store) => store.auth.user);

  const user = useCachedProfile(profileId);

  console.log({ user, profileId });

  const { data: _messages } = useQuery(
    ['dm_messages', { profileId }],
    getUserDmMessages
  );
  const { data: instantMessage } = useQuery(
    ['instant_messages', { profileId }],
    () => {}
  );

  let messages = _messages;
  if (instantMessage?.message && instantMessage?.user_summary?.id !== me.id) {
    messages = [instantMessage, ...messages];
  }

  const [sendMessage] = useMutation(sendUserDmMessage);

  const conversationId = _messages?.[0]?.conversation_id;
  React.useEffect(() => {
    Cable.subscribeConversation(conversationId, profileId);
    return () => {
      Cable.unsubscribeConversation(conversationId);
    };
  }, [conversationId]);

  const { backgrounds } = useLight();

  const submitMessage = React.useCallback(async () => {
    if (text === '') {
      return;
    }
    setText('');
    sendInstant(conversationId, text);
    sendMessage({
      profileId: profileId,
      data: { message: { message: text, type: 0 } },
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
    headerTitle: user?.name,
    headerStyle: {
      backgroundColor: statusColors[user?.status?.color || 0],
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, backgroundColor: backgrounds[0] }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={50}
    >
      <MessageList messages={messages} me={me} />
      <SfTextInput
        textInputStyle={styles.statusInput}
        value={text}
        onSubmitEditing={submitMessage}
        onChangeText={setMessage}
        blurOnSubmit={false}
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
    marginTop: 8,
    padding: 12,
    fontSize: 16,
    borderRadius: 0,
    borderWidth: 0,
    marginBottom: -1,
  },
});
