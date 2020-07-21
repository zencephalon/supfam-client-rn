import React from 'react';

import { putStatusMe } from '~/apis/api';

import { showMessage } from 'react-native-flash-message';
import { queryCache } from 'react-query';

import statusColors from '~/constants/statusColors';

// Could probably improve these
const colorTitle = ['Away', 'Busy', 'Free', 'Open'];
const colorDetail = [
  'DMs: 🔕 Groups: 🔕 Statuses: 🔕',
  'DMs: 🔔 Groups: 🔕 Statuses: 🔕',
  'DMs: 🔔 Groups: 🔔 Statuses: 🔕',
  'DMs: 🔔 Groups: 🔔 Statuses: 🔔',
];

export default function useSetColor(profileId: number) {
  return React.useCallback(
    async (color) => {
      showMessage({
        message: colorTitle[color],
        description: colorDetail[color],
        backgroundColor: statusColors[color],
      });
      try {
        queryCache.setQueryData(['profileMe', profileId], (profile: any) => {
          return {
            ...profile,
            status: {
              ...profile.status,
              color,
            },
          };
        });
        await putStatusMe({ profileId, color });
      } catch (e) {
        console.log(e);
      }
    },
    [profileId]
  );
}
