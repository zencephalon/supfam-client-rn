import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function useSnapImage({ setImage, config }) {
  return async () => {
    if (Constants.platform.ios) {
      // TODO: we could probably improve the request flow here
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    try {
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        ...config,
      });
      if (!image.cancelled) {
        setImage(image);
      }
    } catch (e) {
      console.log(e);
    }
  };
}
