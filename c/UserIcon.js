import * as React from 'react';
import { Image } from 'react-native';
import statusColors from '~/constants/statusColors';

import useCachedUser from '~/hooks/useCachedUser';

export function BareUserIcon(props) {
  return (
    <Image
      source={{ uri: props.uri }}
      style={{
        width: props.size,
        height: props.size,
        borderRadius: 50,
        marginRight: 8,
        borderWidth: props.color !== undefined ? 3 : 1,
        borderColor: props.color,
        ...props.style,
      }}
    />
  );
}

export default UserIcon = (props) => {
  const user = useCachedUser(props.userId);
  const color = statusColors[user?.status?.color];
  console.log({ color, status: user?.status });

  return (
    <BareUserIcon size={props.size} color={color} uri={user?.avatar_url} />
  );
};
