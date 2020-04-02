import * as React from 'react';
import { Image } from 'react-native';
import statusColors from '~/constants/statusColors';

import { useQuery } from 'react-query';

export default UserIcon = props => {
  const { data: user } = useQuery(['friend', props.userId], () => {}, {
    staleTime: Infinity,
  });
  const color = user?.current_status?.color;

  return (
    <Image
      source={{ uri: user?.avatar_url }}
      style={{
        width: props.size,
        height: props.size,
        borderRadius: 50,
        marginRight: 8,
        borderWidth: color !== undefined ? 3 : 1,
        borderColor:
          color !== undefined
            ? statusColors[user.current_status.color]
            : '#434C5E',
      }}
    />
  );
};
