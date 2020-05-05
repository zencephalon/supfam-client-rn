import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import useLight from '~/h/useLight';

import StatusCenter from '~/c/StatusCenter';
import HomeTopBar from '~/c/HomeTopBar';

export default function ChatsScreen() {
  const { backgrounds } = useLight();
  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, backgroundColor: backgrounds[0] }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={20}
    >
      <HomeTopBar title="Chats" />

      {/* <ChatsList /> */}

      <StatusCenter />
    </KeyboardAvoidingView>
  );
}

ChatsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
