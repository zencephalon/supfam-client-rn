import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Text } from 'react-native';

import { useQuery } from 'react-query';
import { getStatusMe } from '~/apis/api';

import statusColors from '~/constants/statusColors';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ConversationScreen({ navigation, route }) {
  // const { data: statusMe } = useQuery('statusMe', getStatusMe);
  const { user } = route.params;

  navigation.setOptions({
    headerTitle: user.name,
    headerStyle: {
      backgroundColor: statusColors[user.current_status.color || 0],
      // backgroundColor: Colors.nord5,
      height: 50,
    },
  });

  return (
    <GiftedChat
      messages={[
        {
          _id: 2,
          text: 'Hey, just want U to know I care about U.',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 3,
          text: 'This is a system message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
          // Any additional custom parameters are passed through
        },
      ]}
      user={{
        _id: 1,
      }}
      isTyping={true}
    />
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    //   enabled
    //   keyboardVerticalOffset={40}
    // >
    //   <Text>CONVERSATION SCREEN</Text>
    // </KeyboardAvoidingView>
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
