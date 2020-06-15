import * as React from 'react';
import { Image, View } from 'react-native';
import statusColors from '~/constants/statusColors';

import useCachedProfile from '~/h/useCachedProfile';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const colorIcons = [
  'close-circle',
  'pause-circle',
  'play-circle',
  'flash-circle',
];

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
      {/* <View
        style={{

        }}
      /> */}
      <MaterialCommunityIcons
        name={colorIcons[props.statusColor]}
        size={size / 3}
        color={props.color}
        style={{
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
  const statusColor = profile?.status?.color;
  const color = statusColors[statusColor];

  return (
    <BareProfileIcon
      size={props.size}
      color={color}
      uri={profile?.avatar_url}
      statusColor={statusColor}
      {...props}
    />
  );
};

export default ProfileIcon = (props) => {
  const profile = useCachedProfile(props.profileId);

  // console.log({ profile, profileId: props.profileId });

  return <ProfileIconFromProfile profile={profile} {...props} />;
};
