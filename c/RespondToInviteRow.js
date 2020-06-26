import * as React from 'react';

import ProfileIcon from './ProfileIcon';
import TopText from './TopText';

import { View, StyleSheet } from 'react-native';

import SfInlineButton from '~/c/SfInlineButton';

import { AWAY } from '~/constants/Colors';

export default function RespondToInviteRow({ invite }) {
  const from_friend = invite.from_friend;

  return (
    <View
      style={{
        ...styles.inviteFriendRow,
      }}
      onPress={() => {}}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={`${from_friend.name} invites you to chat on Supfam!`}
          locationState={from_friend.name}
          lastUpdate={from_friend?.status?.updated_at}
          lastSeen={from_friend?.seen?.updated_at}
          profile={from_friend}
          hideRightSection
        />
        <View style={{ flexDirection: 'row', marginTop: 8, flex: 1 }}>
          <ProfileIcon noBadge profileId={from_friend.id} size={48} avatar_url={from_friend.avatar_url} />
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
              alignItems: 'flex-start',
            }}
          >
            <View style={{
              position: 'absolute',
              right: 4,
              top: 0,
            }}>
              <SfInlineButton
                title="Accept"
                onPress={() => {}}
              />
            </View>
            <View style={{
              position: 'absolute',
              right: 140,
              top: 0,
            }}>
              <SfInlineButton
                title="Decline"
                onPress={() => {}}
                color={AWAY}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inviteFriendRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 12,
  },
});
