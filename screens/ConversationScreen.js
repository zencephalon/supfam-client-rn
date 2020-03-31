import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import { useQuery, useMutation } from 'react-query';
import { getUserDmMessages, sendUserDmMessage } from '~/apis/api';

import statusColors from '~/constants/statusColors';

import { useSelector } from 'react-redux';

import Cable from '~/lib/Cable';

import { throttle } from 'lodash';
import MessageList from '~/c/MessageList';

import useLight from '~/hooks/useLight';

const sendInstant = throttle((conversationId, data) => {
  Cable.sendInstant(conversationId, data);
}, 50);

export default function ConversationScreen({ navigation, route }) {
  const { user } = route.params;
  const { data: _messages } = useQuery(
    ['dm_messages', { userId: user.id }],
    getUserDmMessages
  );
  const { data: instantMessage } = useQuery(
    ['instant_messages', { userId: user.id }],
    () => {}
  );
  const [sendMessage] = useMutation(sendUserDmMessage);

  const conversationId = _messages?.[0]?.conversation_id;
  React.useEffect(() => {
    Cable.subscribeConversation(conversationId, user.id);
    return () => {
      Cable.unsubscribeConversation(conversationId);
    };
  }, [conversationId]);

  const me = useSelector(store => store.auth.user);

  const { backgrounds } = useLight();

  let messages = _messages;

  if (instantMessage?.text) {
    // messages.push(instantMessage);
    messages.push(instantMessage);
  }

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
      keyboardVerticalOffset={40}
    >
      <MessageList messages={messages} />
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
