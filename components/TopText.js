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
        <MaterialCommunityIcons
          name="eye-outline"
          style={{ alignSelf: 'center' }}
          size={14}
          color="#BBB"
        />
        <Text
          style={{
            textAlign: 'left',
            color: '#BBB',
            marginLeft: 1,
          }}
        >
          <TimeAgo time={lastUpdate} suffix="ago" />
        </Text>
      </View>

      <Text
        style={{
          color: textSecondary,
          textAlign: 'center',
          width: '30%',
          fontWeight: '500',
        }}
      >
        {displayName}
      </Text>

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
