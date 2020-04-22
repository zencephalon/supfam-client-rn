import * as React from 'react';

import ProfileIcon from './ProfileIcon';
import TopText from './TopText';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';

import { textPrimary, nord4 } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import useLight from '~/hooks/useLight';

export default function ProfileStatus({ profile, navigation }) {
  const { backgrounds } = useLight();
  return (
    <TouchableOpacity
      style={{
        ...styles.profileStatus,
        borderLeftColor: statusColors[profile.status.color],
        // borderBottomColor: backgrounds[1],
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
        <View style={{ flexDirection: 'row', marginTop: 8, flex: 1 }}>
          <ProfileIcon profileId={profile.id} size={48} />
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
            }}
          >
            <SfText
              style={{
                fontSize: 16,
                flexGrow: 1,
                flexShrink: 1,
                // backgroundColor: backgrounds[1],
                // padding: 8,
                // borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {profile.status.message}
            </SfText>

            <Text style={{ textAlign: 'right', alignSelf: 'stretch' }}>
              {profile.messagePreview}
            </Text>
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
    marginBottom: 8,
  },
});
