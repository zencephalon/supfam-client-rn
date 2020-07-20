import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ProfileIcon from '~/c/ProfileIcon';
import TopText from '~/c/TopText';
import DirectConversationPreview from '~/c/DirectConversationPreview';
import StatusMessageText from '~/c/StatusMessageText';

import statusColors from '~/constants/statusColors';

import useProfileStatusLongPress from '~/h/useProfileStatusLongPress';
import useCachedProfile from '~/h/useCachedProfile';

export default function ProfileStatus({ profileId }) {
  const navigation = useNavigation();

  const onLongPress = useProfileStatusLongPress(profileId);
  const onPress = React.useCallback(() => {
    navigation.navigate('Conversation', {
      profileId: profileId,
    });
  }, [navigation, profileId]);

  return (
    <TouchableOpacity
      style={styles.profileStatus}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText profileId={profileId} />
        <View style={{ flexDirection: 'row', marginTop: 4, flex: 1 }}>
          <ProfileIcon profileId={profileId} size={48} />
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
              alignItems: 'flex-start',
            }}
          >
            <StatusMessageText profileId={profileId} />
            <DirectConversationPreview profileId={profileId} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileStatus: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 12,
  },
});
