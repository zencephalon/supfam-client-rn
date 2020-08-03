import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfContainer from '~/c/SfContainer';
import SfText from '~/c/SfText';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';

import { postProfile } from '~/apis/api';

import { queryCache } from 'react-query';

import useApi from '~/h/useApi';

function ProfileCreate() {
  const [name, setName] = React.useState('');
  const PostProfile = useApi(postProfile, {
    onConfirm: () => {
      queryCache.invalidateQueries('profilesMe');
    },
  });

  const profileBusy = PostProfile.req.requested;
  const cantCreateProfile = !name;
  const createProfile = async () => {
    if (profileBusy || cantCreateProfile) {
      return;
    }

    return PostProfile.call({ name });
  };

  return (
    <SfContainer>
      <SfText style={styles.formLabel}>Almost there! 🎊 </SfText>
      <SfText style={styles.formLabel}>Enter your full name</SfText>
      <SfTextInput
        autoCompleteType="name"
        placeholder="Albus Dumbledore"
        value={name}
        onChangeText={setName}
        ok={!!name}
        autoCapitalize="words"
      />
      <SfButton
        round
        wide
        title={profileBusy ? 'Creating profile...' : 'Create profile'}
        disabled={cantCreateProfile || profileBusy}
        style={{ marginTop: 16 }}
        onPress={createProfile}
      />
    </SfContainer>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    marginBottom: 8,
    marginTop: 8,
    color: 'white',
    fontSize: 24,
  },
});

export default ProfileCreate;
