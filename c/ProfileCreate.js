import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfContainer from '~/c/SfContainer';
import SfText from '~/c/SfText';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import { BareProfileIcon } from '~/c/ProfileIcon';

import { FREE } from '~/constants/Colors';

import { uploadImage, postProfile } from '~/apis/api';

import { queryCache } from 'react-query';

import useApi from '~/h/useApi';
import useSnapImage from '~/h/useSnapImage';
import usePickImage from '~/h/usePickImage';

function ProfileCreate() {
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState(null);
  const PostProfile = useApi(postProfile, {
    onConfirm: () => {
      queryCache.invalidateQueries('profilesMe');
    },
  });
  const UploadImage = useApi(uploadImage);

  const snapImage = useSnapImage({
    setImage,
    config: { allowsEditing: true, aspect: [1, 1] },
  });
  const pickImage = usePickImage({
    setImage,
    imageOptions: { allowsEditing: true, aspect: [1, 1] },
  });

  const profileBusy = PostProfile.req.requested || UploadImage.req.requested;
  const cantCreateProfile = !name || !image;
  const createProfile = async () => {
    if (profileBusy || cantCreateProfile) {
      return;
    }

    const { key: avatar_key } = await UploadImage.call(image.uri);
    // await postProfile({ name, avatar_url });
    return PostProfile.call({ name, avatar_key });
  };

  return (
    <SfContainer>
      <SfText style={styles.formLabel}>Almost there! 🎊 </SfText>
      <SfText style={styles.formLabel}>Enter your full name</SfText>
      <SfTextInput
        placeholder="Albus Dumbledore"
        value={name}
        onChangeText={setName}
        ok={!!name}
        autoCapitalize="words"
      />
      <SfText style={styles.formLabel}>Set profile photo from:</SfText>
      <SfButton round title="Camera" onPress={snapImage} color={FREE} />
      <SfButton round title="Camera roll" onPress={pickImage} color={FREE} />
      {!!image && (
        <BareProfileIcon
          uri={image.uri}
          size={100}
          style={{ alignSelf: 'center' }}
        />
      )}
      <SfButton
        round
        wide
        title={profileBusy ? 'Creating profile...' : 'Create profile'}
        disabled={cantCreateProfile || profileBusy}
        style={{ marginTop: 16 }}
        onPress={createProfile}
      />
    </SfContainer>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    marginBottom: 8,
    marginTop: 8,
    color: 'white',
    fontSize: 24,
  },
});

export default ProfileCreate;
