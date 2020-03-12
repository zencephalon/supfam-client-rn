import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import Friends from '~/containers/Friends';
import StatusMe from '~/containers/StatusMe';
import FriendList from '~/components/FriendList';
import StatusCenter from '~/components/StatusCenter';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Friends>
        <FriendList />
      </Friends>

      <StatusMe>
        <StatusCenter />
      </StatusMe>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
