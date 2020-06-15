import * as React from 'react';
import { Image, View } from 'react-native';
import statusColors from '~/constants/statusColors';

import useCachedProfile from '~/h/useCachedProfile';

export function BareProfileIcon(props) {
  const size = props.size || 32;
  const offset = size / 12;
  const imgSize = (size * 11) / 12;
  return (
    <View
      style={{
        width: imgSize,
        height: imgSize,
        marginRight: offset,
        bottomRight: offset,
      }}
    >
      <Image
        source={{ uri: props.uri }}
        style={{
          width: imgSize,
          height: imgSize,
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
          width: size / 3,
          height: size / 3,
          position: 'absolute',
          bottom: -offset,
          right: -offset,
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
