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
    console.log('initializing cable');
    cable.init();
    return () => {
      console.log('canceling cable');
      cable.disconnect();
    };
  }, []);

  useEffect(() => {
    cable.setProfileId(profileId);
  }, [profileId]);

  useDeepCompareEffect(() => {
    cable.setupFriendChannels(friendIds);
    return () => {
      cable.cleanupFriendChannels();
    };
  }, [friendIds]);

  return null;
}

export default CableContainer;
