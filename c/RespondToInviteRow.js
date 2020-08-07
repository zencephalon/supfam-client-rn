import * as React from 'react';

import ProfileIcon from './ProfileIcon';
import TopText from './TopText';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SfInlineButton from '~/c/SfInlineButton';

import { useAcceptInvite, useDeclineInvite } from '~/h/useRespondToInvite';

import { AWAY } from '~/constants/Colors';

export default function RespondToInviteRow({ invite }) {
  const [showRow, setShowRow] = React.useState(true);

  const navigation = useNavigation();
  const fromFriend = invite?.from_friend;

  if (!fromFriend) {
    return null;
  }

  const acceptInvite = useAcceptInvite(fromFriend.id, () => setShowRow(false));
  const declineInvite = useDeclineInvite(fromFriend, () => setShowRow(false));

  if (!showRow) {
    return null;
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.inviteFriendRow,
      }}
      onPress={() => navigation.navigate('Friend Settings', { profileId: fromFriend.id })}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText title={`${fromFriend.name} invites you to chat on Supfam!`} />
        <View style={{ flexDirection: 'row', marginTop: 8, flex: 1 }}>
          <ProfileIcon
            noBadge
            profileId={fromFriend.id}
            size={48}
            avatar_url={fromFriend.avatar_url}
          />
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                position: 'absolute',
                right: 4,
                top: 0,
              }}
            >
              <SfInlineButton title="Accept" onPress={() => acceptInvite()} />
            </View>
            <View
              style={{
                position: 'absolute',
                right: 140,
                top: 0,
              }}
            >
              <SfInlineButton
                title="Decline"
                onPress={() => declineInvite()}
                color={AWAY}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
