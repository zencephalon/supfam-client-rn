import * as React from 'react';

import TimeAgo from '~/components/TimeAgo';

import { View, Text } from 'react-native';

import { textSecondary, textTertiary } from '~/constants/Colors';

export default function TopText({ displayName, locationState, lastUpdate }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        // justifyContent: "space-between",
        // alignItems: "flex-end",
        flexGrow: 1,
      }}
    >
      <Text style={{ width: '25%', color: textSecondary }}>{displayName}</Text>
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
