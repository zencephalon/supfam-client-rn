import React from 'react';

import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import FullScreenLoader from '~/c/FullScreenLoader';
import SfContainer from '~/c/SfContainer';
import SfButton from '~/c/SfButton';
import SfText from '~/c/SfText';

const NotificationAskScreen = (props) => {
  return (
    <SfContainer>
      <SfText>
        Supfam uses your status to decide whether to send notifications. Enable
        notifications to see when your fam messages.
      </SfText>
      <SfButton title="Allow notifications" />
    </SfContainer>
  );
};

const ProfileGate = (props) => {
  const [waiting, setWaiting] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  React.useEffect(() => {
    const f = async () => {
      if (Constants.isDevice || true) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        setWaiting(false);
        console.log({ existingStatus });
        if (existingStatus === 'granted') {
          setNotificationsEnabled(true);
        }
      } else {
        // Not really, but we can't on a simulator
        setNotificationsEnabled(true);
      }
    };
    f();
  }, []);

  if (waiting) {
    return <FullScreenLoader />;
  }

  if (!notificationsEnabled) {
    return <NotificationAskScreen />;
  }

  return props.children;
};

export default ProfileGate;
