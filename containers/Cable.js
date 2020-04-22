import React, { Fragment, useEffect } from 'react';

import cable from '~/lib/Cable';
import useProfileId from '~/hooks/useProfileId';

function CableContainer() {
  const profileId = useProfileId();

  useEffect(() => {
    cable.init(profileId);
    return () => {
      cable.disconnect();
    };
  }, [profileId]);

  return null;
}

export default CableContainer;
