import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

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
