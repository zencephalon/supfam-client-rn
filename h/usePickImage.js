import React from 'react';
import * as Permissions from 'expo-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import Constants from 'expo-constants';

import { Alert } from 'react-native';

async function pickImage(setImage, config) {
  try {
    let image = await ImagePicker.openPicker({
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

export default function usePickImage({ setImage, config }) {
  return React.useCallback(async () => {
    if (!Constants.platform.ios) {
      pickImage(setImage, config);
      return;
    }

    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    if (status === 'denied') {
      Alert.alert(
        'No camera roll access',
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
              const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
              );

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
  }, [setImage, config]);
}
