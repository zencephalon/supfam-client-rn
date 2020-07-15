import React from 'react';

import { Alert, Platform } from 'react-native';
import Constants from 'expo-constants';

import FullScreenLoader from '~/c/FullScreenLoader';
import SfContainer from '~/c/SfContainer';
import SfButton from '~/c/SfButton';
import SfText from '~/c/SfText';

import { FREE } from '~/constants/Colors';

import * as Notifications from 'expo-notifications';

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
      if (Constants.isDevice) {
        const settings = await Notifications.getPermissionsAsync();
        setWaiting(false);
        console.log({ settings });
        if (settings.granted || settings.ios?.status === 'provisional') {
          setNotificationsEnabled(true);

          // TODO: we have to handle this properly
          if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
            Notifications.setNotificationChannelAsync('minor', {
              name: 'minor',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          }
        }
      } else {
        // Not really, but we can't on a simulator
        setWaiting(false);
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
            await Notifications.requestPermissionsAsync({
              ios: {
                allowAlert: true,
                allowBadge: true,
                allowSound: true,
                allowAnnouncements: true,
              },
            });
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
