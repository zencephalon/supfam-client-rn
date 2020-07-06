import React from 'react';
import { View, Alert } from 'react-native';

import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import ProfileIcon from '~/c/ProfileIcon';

import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useApi from '~/h/useApi';
import useFriends from '~/h/useFriends';
import {postBlockFriend} from '~/apis/api';

export default function FriendSettingsScreen({ navigation, route }) {
  const userProfileId = useProfileId();
  const { profileId } = route.params;
  const profile = useCachedProfile(profileId);

  const BlockFriend = useApi(postBlockFriend);

  const { refetch } = useFriends();

  const block = () => {
    Alert.alert(
      'Are you sure?',
      `You and ${profile?.name} will no longer be able to send one another messages or see each other's statuses.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Block',
          onPress: () => {
            (async() => {
              await BlockFriend.call({to_profile_id: profileId, from_profile_id: userProfileId});
              refetch();
              navigation.navigate('Home');
            })();
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={96}>
      <View style={{
        width: '100%',
        alignItems: 'center',
        paddingTop: 24,
      }}>
        <ProfileIcon
          noBadge
          profileId={profileId}
          size={128}
          avatar_url={profile?.avatar_url}
        />
        <SfText style={{
          paddingTop: 24
        }}>
          your friend {profile?.name}
        </SfText>
        <SfButton 
          en
          round
          title={`Block & Unfriend ${profile?.name}`}
          onPress={block}
          style={{
            marginTop: 16,
            paddingLeft: 48,
            paddingRight: 48,
          }}
        />
      </View>
    </SfKeyboardAvoidingView>
  );
}
