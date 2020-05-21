import React from 'react';
import { Dimensions, Image } from 'react-native';

export default function MessageImagePreview(props) {
  const { image } = props;
  const maxWidth = (Dimensions.get('window').width - 16) * 0.8;
  const targetWidth = Math.min(maxWidth, image.width);
  const height = targetWidth * (image.height / image.width);

  return (
    <Image
      source={{ uri: image.uri, isStatic: true }}
      style={{ width: targetWidth, height }}
    />
  );
}
