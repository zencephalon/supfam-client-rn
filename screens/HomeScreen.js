import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import useLight from '~/hooks/useLight';

import FriendList from '~/c/FriendList';
import StatusCenter from '~/c/StatusCenter';
import HomeTopBar from '~/c/HomeTopBar';

import { getStatusMe } from '~/apis/api';
import { useQuery } from 'react-query';
import statusColors from '~/constants/statusColors';

export default function HomeScreen({ navigation }) {
  const { foregrounds, backgrounds } = useLight();
  navigation.setOptions({
    headerTitle: 'Home',
    headerStyle: {
      backgroundColor: backgrounds[0],
      height: 20,
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
