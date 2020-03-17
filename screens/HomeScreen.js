import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import Friends from '~/containers/Friends';
import StatusMe from '~/containers/StatusMe';
import FriendList from '~/components/FriendList';
import StatusCenter from '~/components/StatusCenter';

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled
      keyboardVerticalOffset={40}
    >
      <Friends>
        <FriendList />
      </Friends>

      <StatusMe>
        <StatusCenter />
      </StatusMe>
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
