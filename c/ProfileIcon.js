import * as React from 'react';
import { Image, View } from 'react-native';

import useCachedProfile from '~/h/useCachedProfile';

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
      {
        !props.noBadge ?
        <StatusBadge
          statusColor={props.statusColor}
          size={size / 3}
          lastSeen={props.lastSeen}
          style={{
            position: 'absolute',
            bottom: -offset,
            right: -offset,
          }}
        /> : null
      }
    </View>
  );
}

export const ProfileIconFromProfile = (props) => {
  const { profile } = props;
  const statusColor = profile?.status?.color;
  const lastSeen = profile?.seen?.updated_at;

  return (
    <BareProfileIcon
      size={props.size}
      uri={profile?.avatar_url}
      statusColor={statusColor}
      lastSeen={lastSeen}
      {...props}
    />
  );
};

export default ProfileIcon = (props) => {
  const profile = useCachedProfile(props.profileId);

  return <ProfileIconFromProfile profile={profile} {...props} />;
};
