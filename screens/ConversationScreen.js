import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

export default function ConversationScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled
      keyboardVerticalOffset={40}
    >
      CONVERSATION SCREEN
    </KeyboardAvoidingView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
