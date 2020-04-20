import React from 'react';
import { useQuery } from 'react-query';
import { getProfilesMe } from '~/apis/api';
import { View } from 'react-native';
import SfText from '~/c/SfText';
import FullScreenLoader from '~/c/FullScreenLoader';
import SfContainer from '~/c/SfContainer';
import Camera from '~/c/Camera';
import ImagePicker from '~/c/ImagePicker';
import ProfileCreate from '~/c/ProfileCreate';

const ProfileGate = (props) => {
  const { data: profiles, status } = useQuery('profilesMe', getProfilesMe);

  console.log({ profiles });

  if (status === 'loading') {
    return <FullScreenLoader />;
  }

  if (!profiles || profiles?.length === 0) {
    return <ProfileCreate />;
  }

  return props.children;
};

export default ProfileGate;
