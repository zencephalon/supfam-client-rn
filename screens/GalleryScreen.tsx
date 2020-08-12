import React from 'react';
import SfContainer from '~/c/SfContainer';
import Gallery from 'zen-react-native-image-gallery';
import { TouchableOpacity, SafeAreaView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const GalleryScreen = ({ navigation, route }) => {
  const { images } = route.params;
  console.log({ images });
  return (
    <SafeAreaView
      style={{ display: 'flex', flex: 1, backgroundColor: 'black' }}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" color="white" size={48} />
        </TouchableOpacity>
        <Gallery
          style={{ flex: 1, backgroundColor: 'black' }}
          images={images}
        />
      </View>
    </SafeAreaView>
  );
};

export default GalleryScreen;
