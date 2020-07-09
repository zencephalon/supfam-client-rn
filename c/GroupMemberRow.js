import * as React from 'react';

import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import SfText from '~/c/SfText';
import SfInlineButton from '~/c/SfInlineButton';
import ProfileIcon from '~/c/ProfileIcon';

import { postConversationRemoveMembers } from '~/apis/api';
import useApi from '~/h/useApi';
import useGroupConversations from '~/h/useGroupConversations';
import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import { useNavigation } from '@react-navigation/native';

import { AWAY } from '~/constants/Colors';

export default function GroupMemberRow({ conversationId, profileId }) {
  const navigation = useNavigation();
  const userProfileId = useProfileId();
  const { refetch } = useGroupConversations();
  const profile = useCachedProfile(profileId);

  const RemoveMember = useApi(postConversationRemoveMembers);

  const [removed, setRemoved] = React.useState(false);

  const remove = () => {
    Alert.alert(
      'Are you sure?',
      `This will remove ${
        userProfileId == profileId ? 'you' : profile.name
      } from the group conversation. ${
        userProfileId == profileId
          ? 'You will not be able to rejoin unless a remaining group member adds you back.'
          : ''
      }`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: `${userProfileId == profileId ? 'Leave' : 'Remove'}`,
          onPress: () => {
            (async () => {
              await RemoveMember.call({ conversationId, profileId });
              refetch();
              setRemoved(true);
              if (userProfileId == profileId) {
                // You just left the conversation, so navigate back to group home.
                navigation.navigate('Home');
              }
            })();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity
      style={styles.addToGroupRow}
      onPress={() => {
        if (!removed) {
          remove();
        }
      }}
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
              {removed ? (
                <SfInlineButton title="Removed" disabled />
              ) : (
                <SfInlineButton
                  title={userProfileId == profileId ? 'Leave' : 'Remove'}
                  onPress={() => remove()}
                  color={AWAY}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addToGroupRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 12,
  },
});
