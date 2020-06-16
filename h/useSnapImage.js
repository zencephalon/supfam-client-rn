import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function useSnapImage({ setImage }) {
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
        // TODO: we shouldn't use a fixed aspect ratio here
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
