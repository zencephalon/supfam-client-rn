import * as React from 'react';

import ProfileIcon from './ProfileIcon';
import TopText from './TopText';

import { View, StyleSheet, Alert } from 'react-native';

import SfInlineButton from '~/c/SfInlineButton';

import useProfileId from '~/h/useProfileId';
import useApi from '~/h/useApi';
import { postAcceptFriendInvite, postDeclineFriendInvite } from '~/apis/api';

import { AWAY } from '~/constants/Colors';

import { queryCache } from 'react-query';

export default function RespondToInviteRow({ invite }) {
  const [showRow, setShowRow] = React.useState(true);

  const Accept = useApi(postAcceptFriendInvite);
  const Decline = useApi(postDeclineFriendInvite);
  const profileId = useProfileId();
  const fromFriend = invite?.from_friend;

  if (!fromFriend) {
    return null;
  }

  const acceptInvite = () => {
    Accept.call({ from_profile_id: fromFriend.id, to_profile_id: profileId });
    queryCache.invalidateQueries(['friends']);
    queryCache.invalidateQueries(['friendInvitesTo', profileId]);
    setShowRow(false);
  };

  const declineInvite = () => {
    Alert.alert(
      'Are you sure?',
      `If you decline ${fromFriend.name}'s invitation, you won't be able to be friends with them on Supfam.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Decline',
          onPress: () => {
            Decline.call({
              from_profile_id: fromFriend.id,
              to_profile_id: profileId,
            });
            setShowRow(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!showRow) {
    return null;
  }

  return (
    <View
      style={{
        ...styles.inviteFriendRow,
      }}
      onPress={() => {}}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={`${fromFriend.name} invites you to chat on Supfam!`}
          locationState={fromFriend.name}
          lastUpdate={fromFriend?.status?.updated_at}
          lastSeen={fromFriend?.seen?.updated_at}
          profile={fromFriend}
          hideRightSection
        />
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
