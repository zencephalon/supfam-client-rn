import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { orderBy } from 'lodash';

import UserStatus from '~/components/UserStatus';

import { nord6 } from '~/constants/Colors';

import { useQuery } from 'react-query';
import { getFriends } from '~/apis/api';

const renderUserStatus = ({ item: user }) => {
  return <UserStatus user={user} />;
};

const FriendList = props => {
  const { status, data, error } = useQuery('friends', getFriends);
  const friends = orderBy(data, ['current_status.updated_at'], ['desc']);

  return (
    <FlatList
      inverted
      data={friends}
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
