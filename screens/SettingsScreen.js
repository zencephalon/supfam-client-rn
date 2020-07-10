import * as React from 'react';
import AuthToken from '~/lib/AuthToken';
import { LOGOUT } from '~/apis/auth/actions';
import { connect } from 'react-redux';
import { View } from 'react-native';

import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import SfButton from '~/c/SfButton';
import SfText from '~/c/SfText';
import SettingsTopBar from '~/c/SettingsTopBar';

import Constants from 'expo-constants';
import statusColors from '~/constants/statusColors';
import { nord10 } from '~/constants/Colors';

import * as Updates from 'expo-updates';

function UpdateButton() {
  const [checkingForUpdate, setCheckingForUpdate] = React.useState(true);
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  const [downloadingUpdate, setDownloadingUpdate] = React.useState(false);

  React.useEffect(() => {
    const f = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
      } catch (e) {
        setCheckingForUpdate(false);
        return;
      }

      setCheckingForUpdate(false);

      if (update.isAvailable) {
        setUpdateAvailable(true);
      }
    };
    f();
  }, []);

  const downloadUpdate = async () => {
    setDownloadingUpdate(true);
    await Updates.fetchUpdateAsync();
    Updates.reloadAsync();
  };

  return (
    <SfButton
      title={
        downloadingUpdate
          ? 'Downloading update...'
          : checkingForUpdate
          ? 'Checking for update...'
          : updateAvailable
          ? 'Download update'
          : 'No update'
      }
      onPress={updateAvailable ? downloadUpdate : () => {}}
      disabled={checkingForUpdate || !updateAvailable}
      onPress={downloadUpdate}
      color={statusColors[2]}
    />
  );
}

export default connect()(function LinksScreen(props) {
  return (
    <SfKeyboardAvoidingView>
      <SettingsTopBar title="Settings" />
      <SfButton
        title="Log out"
        onPress={() => {
          AuthToken.remove();
          props.dispatch(LOGOUT());
        }}
        color={statusColors[0]}
        style={{ marginTop: 16, marginBottom: 16 }}
      />
      <UpdateButton />
      <View
        style={{
          marginTop: 48,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <SfText
          style={{
            fontSize: 20,
            textAlign: 'center',
            width: '80%',
            color: nord10,
          }}
        >
          App version {Constants.nativeAppVersion}
        </SfText>
        <SfText
          style={{
            fontSize: 16,
            textAlign: 'center',
            width: '80%',
            color: nord10,
          }}
        >
          Update id {Updates.updateId}
        </SfText>
      </View>
    </SfKeyboardAvoidingView>
  );
});
