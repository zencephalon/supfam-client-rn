import { useColorScheme } from 'react-native-appearance';
import {
  lightThemeForegrounds,
  lightThemeBackgrounds,
  darkThemeForegrounds,
  darkThemeBackgrounds,
} from '~/constants/Colors';

export default function useColors() {
  const colorScheme = useColorScheme();
  return colorScheme === 'light'
    ? {
        foregrounds: lightThemeForegrounds,
        backgrounds: lightThemeBackgrounds,
        light: true,
      }
    : {
        foregrounds: darkThemeForegrounds,
        backgrounds: darkThemeBackgrounds,
        light: false,
      };
}
