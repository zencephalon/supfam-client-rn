import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ProfileStatus from '~/c/ProfileStatus';

import useLight from '~/hooks/useLight';
import useFriends from '~/hooks/useFriends';

const FriendList = (props) => {
  const { status, friends, error } = useFriends();

  const { backgrounds } = useLight();

  const renderProfileStatus = React.useCallback(
    ({ item: profile }) => {
      return <ProfileStatus profile={profile} navigation={props.navigation} />;
    },
    [props.navigation]
  );

  return (
    <FlatList
      inverted
      data={friends}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderProfileStatus}
      keyExtractor={(profile) => `${profile.id}`}
    />
  );
};

export default FriendList;
