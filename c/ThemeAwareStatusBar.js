import * as React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { StatusBar } from 'react-native';

import useLight from '~/h/useLight';

export default function ThemeAwareStatusBar() {
  const colorScheme = useColorScheme();
  const { backgrounds } = useLight();

  return (
    <StatusBar
      barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
      backgroundColor={backgrounds[0]}
    />
  );
}
