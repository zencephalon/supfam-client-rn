import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Text } from 'react-native';

import { useQuery, useMutation } from 'react-query';
import { getStatusMe, getUserDmMessages, sendUserDmMessage } from '~/apis/api';

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

  // subscribe to conversationId
  // if (_messages[0]?.conversation_id) {
  //   Cable.subscribeToConversation()
  // }
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
      user: { _id: m.user.id, name: m.user.name, avatar: m.user.avatar_url },
      text: m.message,
      _id: m.id,
    }))
    .reverse();

  navigation.setOptions({
    headerTitle: user.name,
    headerStyle: {
      backgroundColor: statusColors[user.current_status.color || 0],
      // backgroundColor: Colors.nord5,
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
