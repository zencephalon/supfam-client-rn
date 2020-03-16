import * as React from 'react';
import { Image } from 'react-native';

export default UserIcon = props => {
  return (
    <Image
      source={{ uri: props.uri }}
      style={{
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 6,
        borderWidth: 1,
        borderColor: '#434C5E',
      }}
    />
  );
};
