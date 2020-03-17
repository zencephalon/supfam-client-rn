import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import UserStatus from '~/components/UserStatus';

import { nord6 } from '~/constants/Colors';

const renderUserStatus = ({ item: user }) => {
  return <UserStatus user={user} />;
};

const FriendList = props => {
  return (
    <FlatList
      inverted
      data={props.friends}
      style={styles.container}
      renderItem={renderUserStatus}
      keyExtractor={user => `${user.id}`}
    />
  );
};

export default FriendList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: nord6,
  },
  contentContainer: {
    paddingTop: 0,
  },
});
