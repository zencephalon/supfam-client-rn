import React from 'react';
import { useQuery } from 'react-query';
import { getProfilesMe } from '~/apis/api';
import { View } from 'react-native';
import SfText from '~/c/SfText';
import FullScreenLoader from '~/c/FullScreenLoader';
import SfContainer from './SfContainer';

const ProfileGate = (props) => {
  const { data: profiles, status } = useQuery('profilesMe', getProfilesMe);

  console.log({ profiles });

  if (status === 'loading') {
    return <FullScreenLoader />;
  }

  if (!profiles || profiles?.length === 0) {
    return (
      <SfContainer>
        <SfText>Create your first profile</SfText>
      </SfContainer>
    );
  }

  return props.children;
};

export default ProfileGate;
