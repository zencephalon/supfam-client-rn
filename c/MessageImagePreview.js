import React from 'react';
import { Dimensions } from 'react-native';
import Image from 'react-native-fast-image';

export default React.memo(function MessageImagePreview({
  uri,
  width,
  height,
}: {
  uri: string,
  width: number,
  height: number,
}) {
  const maxWidth = (Dimensions.get('window').width - 16) * 0.8;
  const targetWidth = Math.min(maxWidth, width);
  const targetHeight = targetWidth * (height / width);

  return (
    <Image
      source={{ uri: uri, isStatic: true }}
      style={{
        width: targetWidth,
        height: targetHeight,
        borderRadius: 8,
        backgroundColor: '#333',
      }}
    />
  );
});
