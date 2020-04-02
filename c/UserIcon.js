import * as React from 'react';
import { Image } from 'react-native';
import statusColors from '~/constants/statusColors';

export default UserIcon = props => {
  return (
    <Image
      source={{ uri: props.uri }}
      style={{
        width: props.size,
        height: props.size,
        borderRadius: 50,
        marginRight: 8,
        borderWidth: props.color ? 3 : 1,
        borderColor: props.color ? statusColors[props.color] : '#434C5E',
      }}
    />
  );
};
