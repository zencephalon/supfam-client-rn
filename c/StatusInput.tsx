import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ProfileIconFromProfile } from '~/c/ProfileIcon';
import MagicInput from '~/c/MagicInput';

export default function StatusInput({ profile, statusMe }) {
  const navigation = useNavigation();

  const goProfileSettings = React.useCallback(() => {
    navigation.navigate('Profile Settings');
  }, [navigation]);

  return (
    <View style={styles.inputContainer}>
      <TouchableHighlight
        style={styles.profileIconContainer}
        onPress={goProfileSettings}
      >
        <ProfileIconFromProfile profile={profile} size={48} />
      </TouchableHighlight>
      <MagicInput
        statusMessage={statusMe?.message}
        statusColor={statusMe?.color}
        updatedAt={statusMe?.updated_at}
        profileId={profile.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileIconContainer: {
    height: '100%',
    flexDirection: 'column',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
});
