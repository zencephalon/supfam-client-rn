import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import useLight from '~/h/useLight';

const FullScreenLoader = () => {
  const { backgrounds } = useLight();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        backgroundColor: backgrounds[0],
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default FullScreenLoader;
