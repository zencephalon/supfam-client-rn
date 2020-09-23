import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

import SfContainer from '~/c/SfContainer';
import SfText from '~/c/SfText';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import { ProfileIconFromProfile } from '~/c/ProfileIcon';

import { FREE } from '~/constants/Colors';

import { uploadImage, putProfile } from '~/apis/api';

import { queryCache } from 'react-query';

import useApi from '~/h/useApi';
import useSnapImage from '~/h/useSnapImage';
import usePickImage from '~/h/usePickImage';
import useProfileId from '~/h/useProfileId';
import useCachedProfile from '~/h/useCachedProfile';

function ProfileEdit({
  setShowEdit,
}: {
  setShowEdit: (value: boolean) => void;
}) {
  const profile_id = useProfileId();
  const profile = useCachedProfile(profile_id);

  const [name, setName] = React.useState(profile.name);
  const [image, setImage] = React.useState(null);

  const PutProfile = useApi(putProfile, {
    onConfirm: () => {
      queryCache.invalidateQueries('profileMe');
    },
  });
  const UploadImage = useApi(uploadImage);

  const snapImage = useSnapImage({
    setImage,
    config: { cropping: true, width: 180, height: 180 },
  });
  const pickImage = usePickImage({
    setImage,
    config: { cropping: true, width: 180, height: 180 },
  });

  const profileBusy = PutProfile.req.requested || UploadImage.req.requested;
  const cantCreateProfile = !name;
  const updateProfile = async () => {
    if (profileBusy || cantCreateProfile) {
      return;
    }

    let avatar_key = undefined;
    if (image) {
      console.log({ image });
      const { key } = await UploadImage.call(image.path);
      avatar_key = key;
    }

    await PutProfile.call({ profile_id, name, avatar_key });
    setShowEdit(false);
  };

  return (
    <SfContainer>
      <SfText style={styles.formLabel}>Enter your full name</SfText>
      <SfTextInput
        autoCompleteType="name"
        placeholder="Albus Dumbledore"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <SfText style={styles.formLabel}>Set new profile photo from:</SfText>
      <SfButton round title="Camera" onPress={snapImage} color={FREE} />
      <SfButton round title="Camera roll" onPress={pickImage} color={FREE} />
      {!!image && (
        <ProfileIconFromProfile
          uri={image.path}
          size={100}
          style={{ alignSelf: 'center' }}
        />
      )}
      <SfButton
        round
        wide
        title={profileBusy ? 'Updating profile...' : 'Update profile'}
        disabled={cantCreateProfile || profileBusy}
        style={{ marginTop: 16 }}
        onPress={updateProfile}
      />
    </SfContainer>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    marginBottom: 8,
    marginTop: 8,
    fontSize: 24,
  },
});

export default ProfileEdit;
