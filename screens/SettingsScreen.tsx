import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import AuthToken from '~/lib/AuthToken';
import { LOGOUT } from '~/apis/auth/actions';
import { useDispatch } from 'react-redux';

import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import SfButton from '~/c/SfButton';
import SfText from '~/c/SfText';
import SettingsTopBar from '~/c/SettingsTopBar';
import UpdateButton from '~/c/UpdateButton';

import Constants from 'expo-constants';
import { nord10, AWAY } from '~/constants/Colors';

import * as Updates from 'expo-updates';

export default function LinksScreen() {
  const dispatch = useDispatch();

  const logout = React.useCallback(() => {
    AuthToken.remove();
    dispatch(LOGOUT());
  }, [dispatch]);

  return (
    <SfKeyboardAvoidingView>
      <SettingsTopBar title="Settings" />
      <SfButton
        title="Log out"
        onPress={logout}
        color={AWAY}
        style={styles.logoutButton}
      />
      <UpdateButton ButtonComponent={SfButton} hideWhenNoUpdate={false} />
      <View style={styles.appDataContainer}>
        <SfText style={styles.versionText}>
          App version {Constants.nativeAppVersion}
        </SfText>
        <SfText style={styles.versionDetailText}>
          Update id {Updates.updateId}
        </SfText>
      </View>
    </SfKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  appDataContainer: {
    marginTop: 48,
    width: '100%',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 20,
    textAlign: 'center',
    width: '80%',
    color: nord10,
  },
  versionDetailText: {
    fontSize: 16,
    textAlign: 'center',
    width: '80%',
    color: nord10,
  },
});
