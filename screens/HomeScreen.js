import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import useLight from '~/hooks/useLight';

import FriendList from '~/c/FriendList';
import StatusCenter from '~/c/StatusCenter';
import HomeTopBar from '~/c/HomeTopBar';

export default function HomeScreen({ navigation }) {
  const { backgrounds } = useLight();
  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, backgroundColor: backgrounds[0] }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={20}
    >
      <HomeTopBar />
      <FriendList navigation={navigation} />

      <StatusCenter />
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
