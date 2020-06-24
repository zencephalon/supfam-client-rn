import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimation } from 'react-native';

import ProfileStatus from '~/c/ProfileStatus';

import useLight from '~/h/useLight';
import useFriends from '~/h/useFriends';

const FriendList = (props) => {
  const { status, friends, error, invalidate, isFetching } = useFriends();
  const [refreshing, setRefreshing] = React.useState(false);

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
      onRefresh={() => {
        setRefreshing(true);
        console.log('PULLED TO REFRESH');
        invalidate();
      }}
      refreshing={refreshing}
      data={friends}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderProfileStatus}
      keyExtractor={(profile) => `${profile.id}`}
      onScrollEndDrag={() => console.log('end')}
      onScrollBeginDrag={() => console.log('start')}
      onScrollToTop={() => console.log('top')}
      onEndReachedThreshold={5}
      onEndReached={() => console.log('onEndReached')}
    />
  );
};

export default FriendList;
