import React from 'react';

import { Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import FullScreenLoader from '~/c/FullScreenLoader';
import SfContainer from '~/c/SfContainer';
import SfButton from '~/c/SfButton';
import SfText from '~/c/SfText';

import { FREE } from '~/constants/Colors';

const NotificationAskScreen = (props) => {
  return (
    <SfContainer>
      <SfText style={{ fontSize: 16, marginBottom: 16, marginTop: 16 }}>
        We built Supfam in large part because we hate notification spam. Supfam
        uses your status to decide whether to send notifications. Set your
        status to Away and we won't interrupt your flow. Enable notifications to
        see when your fam messages.
      </SfText>
      <SfButton title="Allow notifications" onPress={props.requestPermission} />
      <SfButton
        title="Skip for now"
        onPress={props.requestPermission}
        color={FREE}
        onPress={props.skipForNow}
      />
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

  const requestPermission = async () => {
    Alert.alert(
      '"Supfam" Would Like to Send You Notifications',
      "At any time you can set your status to 'Away' to turn off all notifications from Supfam. For the best experience we recommend allowing notifications.",
      [
        {
          text: 'Not Now',
          onPress: () => {
            setNotificationsEnabled(true);
          },
        },
        {
          text: 'Allow',
          onPress: async () => {
            await Permissions.askAsync(Permissions.NOTIFICATIONS);
            setNotificationsEnabled(true);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const skipForNow = () => {
    setNotificationsEnabled(true);
  };

  if (waiting) {
    return <FullScreenLoader />;
  }

  if (!notificationsEnabled) {
    return (
      <NotificationAskScreen
        requestPermission={requestPermission}
        skipForNow={skipForNow}
      />
    );
  }

  return props.children;
};

export default ProfileGate;
