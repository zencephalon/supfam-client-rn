import React, { Fragment, useEffect } from 'react';

import cable from '~/lib/Cable';
import useProfileId from '~/h/useProfileId';
import useFriends from '~/h/useFriends';
import useDeepCompareEffect from 'use-deep-compare-effect';

function CableContainer() {
  const profileId = useProfileId();
  const { friends } = useFriends();
  const friendIds = (friends || []).map((f) => f.id).sort();

  useDeepCompareEffect(() => {
    if (!profileId || friendIds.length === 0) {
      return;
    }
    console.log('initializing cable', { profileId, friendIds });
    cable.init({ profileId, friendIds });
    return () => {
      console.log('canceling cable', { profileId, friendIds });
      cable.disconnect();
    };
  }, [profileId, friendIds]);

  return null;
}

export default CableContainer;
