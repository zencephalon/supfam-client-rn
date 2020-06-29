import React from 'react';

import { Alert } from 'react-native';

import * as Contacts from 'expo-contacts';

export default function useContactsPermission() {
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    const f = async () => {
      const { status } = await Contacts.getPermissionsAsync();

      if (status === 'granted') {
        setAllowed(true);
      }
    };
    f();
  }, []);

  const requestPermission = React.useCallback(() => {
    Alert.alert(
      'Add contacts?',
      'The next dialogue will ask for your permission to import contacts, sound good?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes!',
          onPress: () => {
            (async () => {
              const { status } = await Contacts.requestPermissionsAsync();
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
