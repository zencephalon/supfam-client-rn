import { useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default function () {
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
            Groups: {
              screens: {
                Group: {
                  path: 'conversation/:conversationId',
                  parse: {
                    conversationId: Number,
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
