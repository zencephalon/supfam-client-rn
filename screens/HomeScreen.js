import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useLight } from '~/hooks/useLight';

import FriendList from '~/components/FriendList';
import StatusCenter from '~/components/StatusCenter';

export default function HomeScreen({ navigation }) {
  const { foregrounds, backgrounds } = useLight();
  navigation.setOptions({
    headerTitle: 'Home',
    headerStyle: {
      // backgroundColor: statusColors[statusMe?.color || 0],
      backgroundColor: backgrounds[1],
      height: 50,
    },
    headerTitleStyle: {
      color: foregrounds[1],
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
