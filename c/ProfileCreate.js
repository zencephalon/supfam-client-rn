import React from 'react';
import SfContainer from '~/c/SfContainer';
import SfText from '~/c/SfText';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import { BareUserIcon } from '~/c/UserIcon';

import { FREE } from '~/constants/Colors';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { uploadImage } from '~/apis/api';

function useSnapImage({ setAvatarKey, setImage }) {
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
        uploadImage(image)
          .then((key) => {
            setAvatarKey(key);
            setImage(image.uri);
          })
          .catch((e) => {
            console.log('uploadImage in component', e);
          });
      }
    } catch (E) {
      console.log(E);
    }
  };
}

function usePickImage({ setAvatarKey, setImage }) {
  return async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}

function ProfileCreate(props) {
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [avatarKey, setAvatarKey] = React.useState(null);

  const snapImage = useSnapImage({ setAvatarKey, setImage });
  const pickImage = usePickImage({ setAvatarKey, setImage });

  return (
    <SfContainer>
      <SfText style={{ marginBottom: 16 }}>Create your first profile</SfText>
      <SfTextInput
        placeholder="Display name"
        value={name}
        onChangeText={setName}
      />
      <SfText style={{ marginTop: 16, marginBottom: 8 }}>
        Set profile photo from:
      </SfText>
      <SfButton title="Camera" onPress={snapImage} color={FREE} />
      <SfButton title="Camera roll" onPress={pickImage} color={FREE} />
      {!!image && (
        <BareUserIcon uri={image} size={100} style={{ alignSelf: 'center' }} />
      )}
      <SfButton title="Create profile" style={{ marginTop: 16 }} />
    </SfContainer>
  );
}

export default ProfileCreate;
