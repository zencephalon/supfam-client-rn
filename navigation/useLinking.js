import { useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

// TODO: this is just totally wrong
export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Maps: 'maps',
          Settings: 'settings',
        },
      },
    },
  });
}
