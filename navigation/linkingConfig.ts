import * as Linking from 'expo-linking';

const config = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Conversation: {
            path: 'dm/:profileId',
            parse: {
              profileId: Number,
            },
          },
          Group: {
            path: 'conversation/:conversationId',
            parse: {
              conversationId: Number,
            },
          },
          Settings: 'settings',
        },
      },
    },
  },
};

export default config;
