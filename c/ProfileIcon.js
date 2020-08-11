import * as React from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';

import useCachedProfile from '~/h/useCachedProfile';

import StatusBadge from '~/c/StatusBadge';

function _BareProfileIcon(props) {
  const size = props.size || 32;
  const offset = size / 12;
  const imgSize = (size * 11) / 12;
  return (
    <View
      style={[
        {
          width: imgSize,
          height: imgSize,
          marginRight: offset,
          bottomRight: offset,
        },
        props.style,
      ]}
    >
      <Image
        source={{ uri: props.uri }}
        style={{
          width: imgSize,
          height: imgSize,
          borderRadius: imgSize / 2,
          marginRight: 8,
          opacity: props.opacity || 1,
          ...props.style,
        }}
      />
      {!props.noBadge ? (
        <StatusBadge
          statusColor={props.statusColor}
          size={size / 3}
          lastSeen={props.lastSeen}
          style={{
            position: 'absolute',
            bottom: -offset,
            right: -offset,
          }}
        />
      ) : null}
    </View>
  );
}

const BareProfileIcon = React.memo(_BareProfileIcon);

export const ProfileIconFromProfile = (props) => {
  const { profile, ...restProps } = props;
  const statusColor = profile?.status?.color;
  const lastSeen = profile?.seen?.updated_at;

  return (
    <BareProfileIcon
      size={props.size}
      uri={props.avatar_url || profile?.avatar_url}
      statusColor={statusColor}
      lastSeen={lastSeen}
      {...restProps}
    />
  );
};

function ProfileIcon(props) {
  const profile = useCachedProfile(props.profileId);

  return <ProfileIconFromProfile profile={profile} {...props} />;
}

export default React.memo(ProfileIcon);
