import React from 'react';

import { Alert } from 'react-native';

import * as Location from 'expo-location';

export default function useLocationPermission() {
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    const f = async () => {
      const { status } = await Location.getPermissionsAsync();

      if (status === 'granted') {
        setAllowed(true);
      }
    };
    f();
  }, []);

  const requestPermission = React.useCallback(() => {
    Alert.alert(
      'Allow Supfam to use your location?',
      "Want to make spontaneous gatherings easier? We'll only share your location with your fam.",
      [
        {
          text: 'Not Now',
          style: 'cancel',
        },
        {
          text: 'Yes!',
          onPress: () => {
            (async () => {
              const { status } = await Location.requestPermissionsAsync();
              if (status === 'granted') {
                setAllowed(true);
              }
            })();
          },
        },
      ],
      { cancelable: false }
    );
  }, [setAllowed]);

  return { allowed, requestPermission };
}
