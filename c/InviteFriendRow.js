import * as React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SfText from '~/c/SfText';
import SfInlineButton from '~/c/SfInlineButton';
import ProfileIcon from '~/c/ProfileIcon';

import useProfileId from '~/h/useProfileId';
import useApi from '~/h/useApi';
import { postFriendInvite, postCancelFriendInvite } from '~/apis/api';

export default function InviteFriendRow({ profile }) {
  const [inviteSent, setInviteSent] = React.useState(profile.inviteSent);

  const Invite = useApi(postFriendInvite);
  const CancelInvite = useApi(postCancelFriendInvite);
  const profileId = useProfileId();
  const navigation = useNavigation();

  const sendInvite = () => {
    Invite.call({ from_profile_id: profileId, to_profile_id: profile.id });
    setInviteSent(true);
  };

  const cancelInvite = () => {
    CancelInvite.call({
      from_profile_id: profileId,
      to_profile_id: profile.id,
    });
    setInviteSent(false);
  };

  return (
    <TouchableOpacity
      style={styles.inviteFriendRow}
      onPress={() => navigation.navigate('Friend Settings', { profileId: profile.id })}
    >
      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', marginTop: 8, flex: 1 }}>
          <ProfileIcon
            noBadge
            profileId={profile.id}
            size={48}
            avatar_url={profile.avatar_url}
          />
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
              }}
            >
              {profile.name}
            </SfText>
            <View
              style={{
                position: 'absolute',
                right: 4,
                top: 0,
              }}
            >
              {inviteSent ? (
                <SfInlineButton
                  title="Cancel Invitation"
                  onPress={() => cancelInvite()}
                />
              ) : (
                <SfInlineButton title="Invite" onPress={() => sendInvite()} />
              )}
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
