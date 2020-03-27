import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import { useQuery, useMutation } from 'react-query';
import { getUserDmMessages, sendUserDmMessage } from '~/apis/api';

import statusColors from '~/constants/statusColors';
import { GiftedChat } from 'react-native-gifted-chat';

import { useSelector } from 'react-redux';

import Cable from '~/lib/Cable';

export default function ConversationScreen({ navigation, route }) {
  const { user } = route.params;
  const { data: _messages } = useQuery(
    ['dm_messages', { userId: user.id }],
    getUserDmMessages
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

  const messages = (_messages || [])
    .map(m => ({
      user: m.user_summary,
      text: m.message,
      _id: m.id,
    }))
    .reverse();

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
