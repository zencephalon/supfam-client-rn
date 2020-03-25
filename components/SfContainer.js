import { useColorScheme } from 'react-native-appearance';
import * as React from 'react';

import { SafeAreaView } from 'react-native';

import * as Colors from '~/constants/Colors';

export default function SfContainer(props) {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'light'
      ? Colors.lightThemeBackgrounds[0]
      : Colors.darkThemeBackgrounds[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      {props.children}
    </SafeAreaView>
  );
}
