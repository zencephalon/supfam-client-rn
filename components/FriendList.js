import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import UserStatus from '~/components/UserStatus';

const FriendList = props => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {props.friends.map(user => (
        <UserStatus key={user.id} user={user} />
      ))}
    </ScrollView>
  );
};

export default FriendList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E9F0',
  },
  contentContainer: {
    paddingTop: 0,
  },
});
