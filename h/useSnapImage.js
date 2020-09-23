import React from 'react';
import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Constants from 'expo-constants';

import { Alert } from 'react-native';

async function snapImage(setImage, config) {
  try {
    let image = await ImagePicker.openCamera({
      mediaTypes: 'photo',
      ...config,
    });
    if (!image.cancelled) {
      setImage({ ...image, uri: image.path });
    }
  } catch (e) {
    console.log(e);
  }
}

export default function useSnapImage({ setImage, config }) {
  return React.useCallback(async () => {
    if (!Constants.platform.ios) {
      snapImage(setImage, config);
      return;
    }

    const { status } = await Permissions.getAsync(Permissions.CAMERA);

    if (status === 'denied') {
      Alert.alert(
        'No camera access',
        'You may have accidentally denied access to the camera before. Please enable camera access for Supfam in Settings'
      );
      return;
    }

    if (status === 'granted') {
      snapImage(setImage, config);
      return;
    }

    Alert.alert(
      'Allow Supfam to use your camera?',
      'You can use the camera to send your fam photos.',
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
                snapImage(setImage, config);
                return;
              }

              alert('Sorry, we need camera access to make this work!');
            })();
          },
        },
      ],
      { cancelable: false }
    );
  }, [setImage, config]);
}
