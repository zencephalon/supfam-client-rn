import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { orderBy } from 'lodash';

import UserStatus from '~/components/UserStatus';

import { useQuery } from 'react-query';
import { getFriends } from '~/apis/api';

import useLight from '~/hooks/useLight';

const FriendList = props => {
  const { status, data, error } = useQuery('friends', getFriends);
  const friends = orderBy(
    data,
    ['current_status.color', 'current_status.updated_at'],
    ['desc', 'desc']
  );

  const { backgrounds } = useLight();

  const renderUserStatus = React.useCallback(
    ({ item: user }) => {
      return <UserStatus user={user} navigation={props.navigation} />;
    },
    [props.navigation]
  );

  return (
    <FlatList
      inverted
      data={friends}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderUserStatus}
      keyExtractor={user => `${user.id}`}
    />
  );
};

export default FriendList;
