import * as React from 'react';
import formatAgo from '~/lib/timeAgo';

import { View, Text } from 'react-native';

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
      <Text style={{ width: '25%' }}>{displayName}</Text>
      {/* <Text
        style={{
          width: "50%",
          textAlign: "center"
        }}
      >
        {locationState}
      </Text> */}
      <Text style={{ flexGrow: 1, textAlign: 'right' }}>
        {`${formatAgo(lastUpdate)} ago`}
      </Text>
    </View>
  );
}
