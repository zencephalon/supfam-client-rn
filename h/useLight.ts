import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import {
  lightThemeForegrounds,
  lightThemeBackgrounds,
  darkThemeForegrounds,
  darkThemeBackgrounds,
  BASE_HUE,
} from '~/constants/Colors';

export default function useColors() {
  const colorScheme = useColorScheme();
  const scheme = React.useMemo(() => {
    return colorScheme === 'light'
      ? {
          // modal: `hsla(${BASE_HUE}, 36%, 96%, 0.9)`,
          modal: 'rgba(255, 255, 255, 0.9)',
          foregrounds: lightThemeForegrounds,
          backgrounds: lightThemeBackgrounds,
          light: true,
        }
      : {
          // modal: `hsla(${BASE_HUE}, 80%, 8%, 0.9)`,
          modal: 'rgba(0, 0, 0, 0.8)',
          foregrounds: darkThemeForegrounds,
          backgrounds: darkThemeBackgrounds,
          light: false,
        };
  }, [colorScheme]);
  return scheme;
}
