import * as React from 'react';
import SfText from '~/c/SfText';

import useCachedProfile from '~/h/useCachedProfile';

export default ProfileName = (props) => {
  const profile = useCachedProfile(props.profileId);

  // console.log({ profile, profileId: props.profileId });

  return <SfText style={props.style}>{profile?.name}</SfText>;
};
