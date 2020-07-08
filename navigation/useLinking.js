import { useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

// TODO: this is just totally wrong
export default function (containerRef) {
  const config = {
    prefixes: [Linking.makeUrl('/')],
    config: {
      screens: {
        Root: {
          screens: {
            Home: {
              screens: {
                Conversation: {
                  path: 'dm/:profileId',
                  parse: {
                    profileId: Number,
                  },
                },
              },
            },
            Settings: 'settings',
          },
        },
      },
    },
  };

  return config;
}
