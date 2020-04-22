import React from 'react';
import SfContainer from '~/c/SfContainer';
import SfText from '~/c/SfText';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import { BareProfileIcon } from '~/c/ProfileIcon';

import { FREE } from '~/constants/Colors';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { uploadImage, postProfile } from '~/apis/api';

import { queryCache } from 'react-query';

import useApi from '~/hooks/useApi';

function useSnapImage({ setImage }) {
  return async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    try {
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!image.cancelled) {
        setImage(image);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

function usePickImage({ setImage }) {
  return async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    try {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!image.cancelled) {
        setImage(image);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

function ProfileCreate(props) {
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState(null);
  const PostProfile = useApi(postProfile, {
    onConfirm: () => {
      queryCache.refetchQueries('profilesMe');
    },
  });
  const UploadImage = useApi(uploadImage);

  const snapImage = useSnapImage({ setImage });
  const pickImage = usePickImage({ setImage });

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
      <SfText style={{ marginBottom: 16 }}>Create your first profile</SfText>
      <SfTextInput
        placeholder="Display name"
        value={name}
        onChangeText={setName}
        ok={!!name}
      />
      <SfText style={{ marginTop: 16, marginBottom: 8 }}>
        Set profile photo from:
      </SfText>
      <SfButton title="Camera" onPress={snapImage} color={FREE} />
      <SfButton title="Camera roll" onPress={pickImage} color={FREE} />
      {!!image && (
        <BareProfileIcon
          uri={image.uri}
          size={100}
          style={{ alignSelf: 'center' }}
        />
      )}
      <SfButton
        title={profileBusy ? 'Creating profile...' : 'Create profile'}
        disabled={cantCreateProfile || profileBusy}
        style={{ marginTop: 16 }}
        onPress={createProfile}
      />
    </SfContainer>
  );
}

export default ProfileCreate;
