import * as React from 'react';

import statusColors from '../constants/statusColors';

import { View } from 'react-native';

export default function StatusStripe(props) {
  return (
    <View
      style={{
        width: 6,
        backgroundColor: statusColors[props.statusColor],
        marginRight: 6,
      }}
    ></View>
  );
}
