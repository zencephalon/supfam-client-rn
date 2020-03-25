import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Text } from 'react-native';

import { useQuery } from 'react-query';
import { getStatusMe } from '~/apis/api';

import statusColors from '~/constants/statusColors';

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled
      keyboardVerticalOffset={40}
    >
      <Text>CONVERSATION SCREEN</Text>
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
