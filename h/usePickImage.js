import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { Alert } from 'react-native';

async function pickImage(setImage, imageOptions) {
  try {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      ...imageOptions,
    });
    if (!image.cancelled) {
      setImage(image);
    }
  } catch (e) {
    console.log(e);
  }
}

export default function usePickImage({ setImage, config }) {
  return async () => {
    if (!Constants.platform.ios) {
      pickImage(setImage, config);
      return;
    }

    const { status } = await Permissions.getPermissionsAsync(
      Permissions.CAMERA
    );

    if (status === 'denied') {
      Alert.alert(
        'You may have accidentally denied access to the camera roll before. Please enable camera roll access for Supfam in Settings'
      );
      return;
    }

    if (status === 'granted') {
      pickImage(setImage, config);
      return;
    }

    Alert.alert(
      'Allow Supfam to use your camera roll?',
      'You can use the camera roll to send your fam photos.',
      [
        {
          text: 'Not Now',
          style: 'cancel',
        },
        {
          text: 'Yes!',
          onPress: () => {
            (async () => {
              const { status } = await Permissions.askAsync(Permissions.CAMERA);

              if (status === 'granted') {
                pickImage(setImage, config);
                return;
              }

              alert('Sorry, we need camera roll access to make this work!');
            })();
          },
        },
      ],
      { cancelable: false }
    );
  };
}
