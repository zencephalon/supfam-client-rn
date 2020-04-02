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

import useLight from '~/hooks/useLight';

const sendInstant = throttle((conversationId, message) => {
  Cable.sendInstant(conversationId, message);
}, 50);

export default function ConversationScreen({ navigation, route }) {
  const [text, setText] = React.useState('');
  const { user } = route.params;

  const me = useSelector(store => store.auth.user);

  const { data: _messages } = useQuery(
    ['dm_messages', { userId: user.id }],
    getUserDmMessages
  );
  const { data: instantMessage } = useQuery(
    ['instant_messages', { userId: user.id }],
    () => {}
  );

  let messages = _messages;
  if (instantMessage?.message && instantMessage?.user_summary?.id !== me.id) {
    messages = [instantMessage, ...messages];
  }

  const [sendMessage] = useMutation(sendUserDmMessage);

  const conversationId = _messages?.[0]?.conversation_id;
  React.useEffect(() => {
    Cable.subscribeConversation(conversationId, user.id);
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
      userId: user.id,
      data: { message: { message: text, type: 0 } },
    });
  }, [text, user.id, me]);

  const setMessage = React.useCallback(
    text => {
      setText(text);
      sendInstant(conversationId, text);
    },
    [me, conversationId]
  );

  navigation.setOptions({
    headerTitle: user.name,
    headerStyle: {
      backgroundColor: statusColors[user.current_status.color || 0],
      height: 50,
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
        style={styles.statusInput}
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
