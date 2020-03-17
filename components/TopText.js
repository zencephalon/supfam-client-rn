import * as React from 'react';

import TimeAgo from '~/components/TimeAgo';

import { View, Text } from 'react-native';

import { textSecondary, textTertiary } from '~/constants/Colors';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { nord10 } from '~/constants/Colors';

export default function TopText({ displayName, locationState, lastUpdate }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        // justifyContent: "space-between",
        alignItems: 'flex-end',
        flexGrow: 1,
      }}
    >
      <Text style={{ color: textSecondary }}>{displayName}</Text>
      <MaterialCommunityIcons name="battery-40" size={14} color="#BBB" />
      <MaterialCommunityIcons name="wifi-strength-2" size={14} color="#BBB" />
      {/* <MaterialCommunityIcons name="signal-3g" size={14} color="#BBB" /> */}

      {/* <Text
        style={{
          width: "50%",
          textAlign: "center"
        }}
      >
        {locationState}
      </Text> */}
      <Text style={{ flexGrow: 1, textAlign: 'right', color: textTertiary }}>
        <TimeAgo time={lastUpdate} suffix="ago" />
      </Text>
    </View>
  );
}
