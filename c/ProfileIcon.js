import * as React from 'react';
import { Image, View } from 'react-native';
import statusColors from '~/constants/statusColors';

import useCachedProfile from '~/h/useCachedProfile';

export function BareProfileIcon(props) {
  return (
    <View
      style={{
        width: props.size || 32,
        height: props.size || 32,
      }}
    >
      <Image
        source={{ uri: props.uri }}
        style={{
          width: props.size || 32,
          height: props.size || 32,
          borderRadius: 50,
          marginRight: 8,
          // borderWidth: props.color !== undefined ? 3 : 1,
          // borderColor: props.color,
          opacity: props.opacity || 1,
          ...props.style,
        }}
      />
      <View
        style={{
          backgroundColor: props.color,
          borderRadius: 50,
          width: props.size / 4,
          height: props.size / 4,
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      />
    </View>
  );
}

export const ProfileIconFromProfile = (props) => {
  const { profile } = props;
  const color = statusColors[profile?.status?.color];

  return (
    <BareProfileIcon
      size={props.size}
      color={color}
      uri={profile?.avatar_url}
    />
  );
};

export default ProfileIcon = (props) => {
  const profile = useCachedProfile(props.profileId);
  const color = statusColors[profile?.status?.color];

  // console.log({ profile, profileId: props.profileId });

  return (
    <BareProfileIcon
      size={props.size}
      color={color}
      uri={profile?.avatar_url}
      opacity={props.opacity}
    />
  );
};
