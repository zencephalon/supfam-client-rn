import React from 'react';
import { useQuery } from 'react-query';
import { getProfilesMe } from '~/apis/api';
import FullScreenLoader from '~/c/FullScreenLoader';
import ProfileCreate from '~/c/ProfileCreate';
import AuthToken from '~/lib/AuthToken';

import useProfileSelect from '~/h/useProfileSelect';

const ProfileGate = (props) => {
  const profileSelect = useProfileSelect();
  const { data: profiles, status } = useQuery('profilesMe', getProfilesMe);

  React.useEffect(() => {
    if ((profiles?.length || 0) > 0) {
      profiles.forEach((profile) => {
        if (profile.is_default) {
          profileSelect(profile.id);
        }
      });
    }
  }, [profiles]);

  if (status === 'loading') {
    return <FullScreenLoader />;
  }

  if (profiles?.length === 0) {
    return <ProfileCreate />;
  }

  if (!profiles) {
    AuthToken.remove();
  }

  return props.children;
};

export default ProfileGate;
