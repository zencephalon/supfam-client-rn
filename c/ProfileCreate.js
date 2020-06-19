import React from 'react';
import {StyleSheet, View} from 'react-native';
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
    <SfContainer darkBg>
      <View style={styles.formContainer}>
        <SfText style={styles.formLabel}>Create your first profile</SfText>
        <SfTextInput
          placeholder="Display name"
          value={name}
          onChangeText={setName}
          ok={!!name}
        />
        <SfText style={styles.formLabel}>
          Set profile photo from:
        </SfText>
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
          title={profileBusy ? 'Creating profile...' : 'Create profile'}
          disabled={cantCreateProfile || profileBusy}
          style={{ marginTop: 16 }}
          onPress={createProfile}
        />
      </View>
    </SfContainer>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    marginBottom: 16,
    marginTop: 16,
    color: 'white'
  },
  formContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
  },
});

export default ProfileCreate;
