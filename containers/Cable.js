import React, { Fragment, useEffect } from 'react';

import cable from '~/lib/Cable';
import useProfileId from '~/h/useProfileId';
import useFriends from '~/h/useFriends';
import useDeepCompareEffect from 'use-deep-compare-effect';

function CableContainer() {
  const profileId = useProfileId();
  const { friends } = useFriends();
  const friendIds = (friends || []).map((f) => f.id).sort();

  useEffect(() => {
    cable.setProfileId(profileId);
  }, [profileId]);

  useDeepCompareEffect(() => {
    if (friendIds.length === 0) {
      return;
    }
    console.log('initializing cable', { friendIds });
    cable.init({ friendIds });
    return () => {
      console.log('canceling cable', { friendIds });
      cable.disconnect();
    };
  }, [friendIds]);

  return null;
}

export default CableContainer;
