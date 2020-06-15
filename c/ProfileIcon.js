import * as React from 'react';
import { Image, View } from 'react-native';
import statusColors from '~/constants/statusColors';

import useCachedProfile from '~/h/useCachedProfile';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import StatusBadge from '~/c/StatusBadge';

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
          opacity: props.opacity || 1,
          ...props.style,
        }}
      />
      <StatusBadge
        statusColor={props.statusColor}
        size={size / 3}
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

  return <ProfileIconFromProfile profile={profile} {...props} />;
};
