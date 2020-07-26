import React from 'react';
import { View, Alert } from 'react-native';

import ProfileEdit from '~/c/ProfileEdit';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import SfTextButton from '~/c/SfTextButton';
import ProfileIcon from '~/c/ProfileIcon';

import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useApi from '~/h/useApi';
import useFriends from '~/h/useFriends';
import { postBlockFriend } from '~/apis/api';

import { AWAY } from '~/constants/Colors';

export default function ProfileSettingsScreen({ navigation }) {
  const profileId = useProfileId();
  const profile = useCachedProfile(profileId);

  const [showEdit, setShowEdit] = React.useState(false);

  const { refetch } = useFriends();

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={96}>
      
      {
        showEdit ?
        <ProfileEdit setShowEdit={setShowEdit}/>
        :
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 16,
          }}
        >
          <ProfileIcon
            noBadge
            profileId={profileId}
            size={128}
            avatar_url={profile?.avatar_url}
          />
          <SfText
            style={{
              marginTop: 16,
            }}
          >
            {profile?.name}
          </SfText>
          <SfTextButton
            title={'✏️ edit profile'}
            onPress={() => setShowEdit(true)}
            color={AWAY}
            style={{
              marginTop: 16,
              paddingLeft: 48,
              paddingRight: 48,
            }}
            buttonFontSize={20}
            underline
          />
        </View>
      }
    </SfKeyboardAvoidingView>
  );
}
