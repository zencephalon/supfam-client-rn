import * as React from 'react';
import {
  MaterialCommunityIcons,
  createMultiStyleIconSet,
} from '@expo/vector-icons';
import statusColors from '~/constants/statusColors';

import useInterval from '@use-it/interval';

const colorIcons = [
  'close-circle',
  'pause-circle',
  'play-circle',
  'plus-circle', // flash-circle, star-circle, heart-circle
];

function getIcon(statusColor, lastSeen) {
  const diff = new Date() - new Date(lastSeen);
  const onlineNow = diff < 30 * 1000;
  return onlineNow ? 'eye-circle' : null;
}

export default function StatusBadge({ statusColor, style, size, lastSeen }) {
  const diff = new Date() - new Date(lastSeen);
  const onlineNow = diff < 30 * 1000;
  const [icon, setIcon] = React.useState(getIcon(statusColor, lastSeen));

  useInterval(
    () => {
      setIcon(getIcon(statusColor, lastSeen));
    },
    onlineNow ? 2000 : 1000 * 60 * 60
  );
  return (
    <MaterialCommunityIcons
      name={icon || colorIcons[statusColor]}
      size={size}
      color={statusColors[statusColor]}
      style={style}
    />
  );
}
