import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import { useQuery, useMutation } from 'react-query';
import { getUserDmMessages, sendUserDmMessage } from '~/apis/api';

import statusColors from '~/constants/statusColors';
import { GiftedChat } from 'react-native-gifted-chat';

import { useSelector } from 'react-redux';

import Cable from '~/lib/Cable';

import { throttle } from 'lodash';

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
    () => {
      return Promise.resolve({
        text: null,
        _id: 'instant',
        user: null,
      });
    }
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

  let messages = (_messages || [])
    .map(m => ({
      user: m.user_summary,
      text: m.message,
      _id: m.id,
    }))
    .reverse();

  if (instantMessage?.text && instantMessage?.user?._id !== me.id) {
    // messages.push(instantMessage);
    messages = [instantMessage, ...messages];
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
      style={styles.container}
      behavior="padding"
      enabled
      keyboardVerticalOffset={40}
    >
      <GiftedChat
        messages={messages}
        user={{
          _id: me.id,
        }}
        showAvatarForEveryMessage={true}
        isTyping={true}
        isKeyboardInternallyHandled={false}
        onSend={messages => {
          // console.log(messages);
          messages.forEach(message => {
            sendMessage({
              userId: user.id,
              data: { message: { message: message.text, type: 0 } },
            });
          });
          // sendMessage(user.id, messages)
        }}
        onInputTextChanged={text => {
          sendInstant(conversationId, {
            text,
            _id: 'instant',
            user: {
              _id: me.id,
              name: me.name,
              avatar: me.avatar_url,
            },
          });
        }}
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
});
