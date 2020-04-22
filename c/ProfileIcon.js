import * as React from 'react';
import { Image } from 'react-native';
import statusColors from '~/constants/statusColors';

import useCachedProfile from '~/hooks/useCachedProfile';

export function BareProfileIcon(props) {
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

export default ProfileIcon = (props) => {
  const profile = useCachedProfile(props.profileId);
  const color = statusColors[profile?.status?.color];
  console.log({ profile });

  return (
    <BareProfileIcon
      size={props.size}
      color={color}
      uri={profile?.avatar_url}
    />
  );
};
