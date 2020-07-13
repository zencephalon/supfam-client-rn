import * as React from 'react';

import ProfileIcon from './ProfileIcon';
import TopText from './TopText';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import DirectConversationPreview from '~/c/DirectConversationPreview';

import statusColors from '~/constants/statusColors';

import { useNavigation } from '@react-navigation/native';

const THIRTY_MINUTES = 30 * 60 * 1000;
const THREE_HOURS = 3 * 60 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;
const MIN_OPACITY = 0.2

export default function ProfileStatus({ profile }) {
  const navigation = useNavigation();

  // Calculate time since status was updated
  const statusUpdatedStamp = new Date(profile.status.updated_at).getTime();
  const nowStamp = new Date().getTime();
  const timeSinceMillis = nowStamp - statusUpdatedStamp;

  let recentUpdate = false;
  let opacity = 1;
  if(timeSinceMillis < THIRTY_MINUTES) {
    recentUpdate = true;
  }
  if(timeSinceMillis > THREE_HOURS && timeSinceMillis < ONE_DAY) {
    const intoGreyingPeriod = timeSinceMillis - THREE_HOURS;
    const percentIn = intoGreyingPeriod / (ONE_DAY - THREE_HOURS);
    const opacityModifier = (1-MIN_OPACITY) * percentIn;
    opacity = 1 - opacityModifier;
    opacity = Math.round(100 * opacity) / 100;
  }
  if(timeSinceMillis > ONE_DAY) {
    opacity = MIN_OPACITY;
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.profileStatus,
        borderLeftColor: statusColors[profile?.status?.color],
      }}
      onPress={() => {
        navigation.navigate('Conversation', { profileId: profile.id });
      }}
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
            <SfText
              style={{
                fontSize: 16,
                flexGrow: 1,
                flexShrink: 1,
                marginLeft: 8,
                overflow: 'hidden',
                opacity: opacity,
                fontWeight: recentUpdate ? 'bold' : 'normal',
              }}
            >
              {profile?.status?.message}
            </SfText>
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
    // borderLeftWidth: 4,
    paddingLeft: 8,
    // borderBottomWidth: 1,
    paddingRight: 8,
    paddingLeft: 8,
    marginBottom: 12,
  },
});
