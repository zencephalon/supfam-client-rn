import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import UserStatus from '~/c/UserStatus';

import useLight from '~/hooks/useLight';
import useFriends from '~/hooks/useFriends';

const FriendList = props => {
  const { status, friends, error } = useFriends();

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
