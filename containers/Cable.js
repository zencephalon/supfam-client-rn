import React, { Fragment, useEffect } from 'react';

import cable from '~/lib/Cable';
import useProfileId from '~/hooks/useProfileId';
import useFriends from '~/hooks/useFriends';
import useDeepCompareEffect from 'use-deep-compare-effect';

function CableContainer() {
  const profileId = useProfileId();
  const { friends } = useFriends();
  const friendIds = (friends || []).map((f) => f.id).sort();

  useDeepCompareEffect(() => {
    cable.init({ profileId, friendIds });
    return () => {
      cable.disconnect();
    };
  }, [profileId, friendIds]);

  return null;
}

export default CableContainer;
