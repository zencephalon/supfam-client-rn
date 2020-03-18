import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Colors from '~/constants/Colors';

function NetworkStatus({ networkType, networkStrength, cellularGeneration }) {
  let icon;
  let color;

  icon = 'wifi';
  color = '#BBB';

  if (!networkType) {
    return null;
  }

  if (networkType === 'wifi') {
    icon = 'wifi';
    color = Colors.green;
  }
  if (networkType === 'cellular') {
    icon = 'signal';
  }

  return (
    <MaterialCommunityIcons style={{}} name={icon} size={14} color={color} />
  );
}

export default NetworkStatus;
