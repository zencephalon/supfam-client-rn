import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ProfileIcon from '~/c/ProfileIcon';
import TopText from '~/c/TopText';
import DirectConversationPreview from '~/c/DirectConversationPreview';
import StatusMessageText from '~/c/StatusMessageText';

import statusColors from '~/constants/statusColors';

import useProfileStatusLongPress from '~/h/useProfileStatusLongPress';

export default function ProfileStatus({ profile }) {
  const navigation = useNavigation();

  const statusMessage = profile?.status?.message;
  const onLongPress = useProfileStatusLongPress(statusMessage, profile?.id);
  const onPress = React.useCallback(() => {
    navigation.navigate('Conversation', {
      profileId: profile.id,
    });
  }, [navigation, profile.id]);

  return (
    <TouchableOpacity
      style={{
        ...styles.profileStatus,
        borderLeftColor: statusColors[profile?.status?.color],
      }}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={profile.name}
          locationState={profile.name}
          lastUpdate={profile?.status?.updated_at}
          lastSeen={profile?.seen?.updated_at}
          profile={profile}
        />
        <View style={{ flexDirection: 'row', marginTop: 4, flex: 1 }}>
          <ProfileIcon profileId={profile.id} size={48} />
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
              alignItems: 'flex-start',
            }}
          >
            <StatusMessageText
              statusMessage={statusMessage}
              updatedAt={profile?.status?.updated_at}
            />
            <DirectConversationPreview userId={profile?.user_id} />
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
