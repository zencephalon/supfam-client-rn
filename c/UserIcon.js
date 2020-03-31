import * as React from 'react';
import { Image } from 'react-native';

export default UserIcon = props => {
  return (
    <Image
      source={{ uri: props.uri }}
      style={{
        width: props.size,
        height: props.size,
        borderRadius: 50,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#434C5E',
      }}
    />
  );
};
