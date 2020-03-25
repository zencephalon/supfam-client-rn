import * as React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { StatusBar } from 'react-native';

export default function ThemeAwareStatusBar() {
  const colorScheme = useColorScheme();
  return (
    <StatusBar
      barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
    />
  );
}
