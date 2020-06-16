import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation } from 'react-native';

import ProfileStatus from '~/c/ProfileStatus';

import useLight from '~/h/useLight';
import useFriends from '~/h/useFriends';
import useConversationMemberships from '~/h/useConversationMemberships';

const FriendList = (props) => {
  const { status, friends, error } = useFriends();
  const { conversationMemberships } = useConversationMemberships();

  const { backgrounds } = useLight();

  const renderProfileStatus = React.useCallback(({ item: profile }) => {
    return <ProfileStatus profile={profile} />;
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
  }, [friends]);

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
