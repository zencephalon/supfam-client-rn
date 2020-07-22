import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Updates from 'expo-updates';

import statusColors from '~/constants/statusColors';

export default function UpdateButton({
  ButtonComponent,
  hideWhenNoUpdate,
  ...restProps
}) {
  const [checkingForUpdate, setCheckingForUpdate] = React.useState(true);
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  const [downloadingUpdate, setDownloadingUpdate] = React.useState(false);

  useFocusEffect(() => {
    const f = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        setCheckingForUpdate(false);

        if (update.isAvailable) {
          setUpdateAvailable(true);
        }
      } catch (e) {
        setCheckingForUpdate(false);
        return;
      }
    };
    f();
  }, []);

  const downloadUpdate = async () => {
    setDownloadingUpdate(true);
    await Updates.fetchUpdateAsync();
    Updates.reloadAsync();
  };

  const disabled = checkingForUpdate || !updateAvailable;

  if (hideWhenNoUpdate && !updateAvailable && !checkingForUpdate) {
    return null;
  }

  return (
    <ButtonComponent
      title={
        downloadingUpdate
          ? 'Downloading update...'
          : checkingForUpdate
          ? 'Checking for update...'
          : updateAvailable
          ? 'Download update'
          : 'No update'
      }
      onPress={disabled ? () => {} : downloadUpdate}
      disabled={disabled}
      color={statusColors[2]}
      {...restProps}
    />
  );
}
