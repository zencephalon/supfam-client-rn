import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import statusColors from '~/constants/statusColors';

const colorIcons = [
  'close-circle',
  'pause-circle',
  'play-circle',
  'flash-circle',
];

export default function StatusBadge({ statusColor, style, size }) {
  return (
    <MaterialCommunityIcons
      name={colorIcons[statusColor]}
      size={size}
      color={statusColors[statusColor]}
      style={style}
    />
  );
}
