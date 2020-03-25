import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import FriendList from '~/components/FriendList';
import StatusCenter from '~/components/StatusCenter';

import * as Colors from '~/constants/Colors';

export default function HomeScreen({ navigation }) {
  navigation.setOptions({
    headerTitle: 'Home',
    headerStyle: {
      // backgroundColor: statusColors[statusMe?.color || 0],
      backgroundColor: Colors.nord5,
      height: 50,
    },
    headerTitleStyle: {
      color: Colors.nord3,
    },
  });
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled
      keyboardVerticalOffset={50}
    >
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
