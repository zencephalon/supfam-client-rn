import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation } from 'react-native';

import InviteFriendRow from '~/c/InviteFriendRow';

import useLight from '~/h/useLight';
import useFriends from '~/h/useFriends';
import useFriendsOfFriends from '~/h/useFriendsOfFriends';

const FriendOfFriendList = () => {
  // const { status, friends, error } = useFriends();
  const { friendsOfFriends } = useFriendsOfFriends();

  const { backgrounds } = useLight();

  const renderInviteRow = React.useCallback(({ item: profile }) => {
    return <InviteFriendRow profile={profile} />;
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: { type: LayoutAnimation.Types.easeInEaseOut },
    });
  }, [friendsOfFriends]);

  return (
    <FlatList
      inverted
      data={friendsOfFriends}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderInviteRow}
      keyExtractor={(profile) => `${profile.id}`}
    />
  );
};

export default FriendOfFriendList;
