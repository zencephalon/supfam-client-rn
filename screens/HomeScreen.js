import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import useLight from '~/hooks/useLight';

import FriendList from '~/components/FriendList';
import StatusCenter from '~/components/StatusCenter';

import { getStatusMe } from '~/apis/api';
import { useQuery } from 'react-query';
import statusColors from '~/constants/statusColors';

export default function HomeScreen({ navigation }) {
  const { data: statusMe } = useQuery('statusMe', getStatusMe);

  const { foregrounds, backgrounds } = useLight();
  navigation.setOptions({
    headerTitle: 'Home',
    headerStyle: {
      backgroundColor: statusColors[statusMe?.color || 0],
      // backgroundColor: backgrounds[1],
      height: 50,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    headerTitleStyle: {
      color: foregrounds[0],
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
