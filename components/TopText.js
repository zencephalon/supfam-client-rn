import * as React from 'react';

import TimeAgo from '~/components/TimeAgo';

import { View, Text } from 'react-native';

import { textSecondary, textTertiary } from '~/constants/Colors';

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { nord10 } from '~/constants/Colors';

export default function TopText({ displayName, locationState, lastUpdate }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            color: textSecondary,
            fontWeight: '500',
          }}
        >
          {displayName}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            color: '#BBB',
            marginLeft: 6,
          }}
        >
          <TimeAgo time={lastUpdate} suffix="ago" />
        </Text>
        <MaterialCommunityIcons
          name="eye-outline"
          style={{ alignSelf: 'center' }}
          size={14}
          color="#BBB"
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            textAlign: 'right',
            color: '#BBB',
            alignSelf: 'flex-end',
            fontSize: 14,
          }}
        >
          <TimeAgo time={lastUpdate} suffix="ago" />
        </Text>
        <FontAwesome
          style={{
            textAlign: 'right',
            marginLeft: 3,
            alignSelf: 'flex-end',
          }}
          name="pencil-square-o"
          size={14}
          color="#BBB"
        />
      </View>
    </View>
  );
}
