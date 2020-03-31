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

import { pick } from 'lodash';

const sendInstant = throttle((conversationId, data) => {
  Cable.sendInstant(conversationId, data);
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
    setText('');
    await sendMessage({
      userId: user.id,
      data: { message: { message: text, type: 0 } },
    });
  }, [text, user.id]);

  const setMessage = React.useCallback(
    text => {
      setText(text);
      sendInstant(conversationId, {
        message: text,
        type: 0,
        id: 'instant',
        user_summary: pick(me, ['id', 'name', 'avatar_url']),
      });
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
