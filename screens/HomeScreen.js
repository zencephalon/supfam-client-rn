import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, StatusBar } from 'react-native';
import { useColorScheme, Appearance } from 'react-native-appearance';

import FriendList from '~/components/FriendList';
import StatusCenter from '~/components/StatusCenter';

import * as Colors from '~/constants/Colors';

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  navigation.setOptions({
    headerTitle: 'Home',
    headerStyle: {
      // backgroundColor: statusColors[statusMe?.color || 0],
      backgroundColor: colorScheme === 'light' ? Colors.nord5 : Colors.nord1,
      height: 50,
    },
    headerTitleStyle: {
      color: colorScheme === 'light' ? Colors.nord2 : Colors.nord4,
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
