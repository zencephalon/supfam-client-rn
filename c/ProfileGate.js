import React from 'react';
import { useQuery } from 'react-query';
import { getProfilesMe } from '~/apis/api';
import FullScreenLoader from '~/c/FullScreenLoader';
import ProfileCreate from '~/c/ProfileCreate';

import { SELECT } from '~/apis/profile/actions';

import { useDispatch } from 'react-redux';

const ProfileGate = (props) => {
  const dispatch = useDispatch();
  const { data: profiles, status } = useQuery('profilesMe', getProfilesMe);

  React.useEffect(() => {
    if ((profiles?.length || 0) > 0) {
      dispatch(SELECT(profiles[0].id));
    }
  }, [profiles]);

  if (status === 'loading') {
    return <FullScreenLoader />;
  }

  if (!profiles || profiles?.length === 0) {
    return <ProfileCreate />;
  }

  return props.children;
};

export default ProfileGate;
