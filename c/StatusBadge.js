import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import statusColors from '~/constants/statusColors';

import useInterval from '@use-it/interval';
import useLight from '~/h/useLight';

import { View } from 'react-native';

const colorIcons = [
  'close-circle',
  'pause-circle',
  'play-circle', // record-circle
  'chevron-up-circle', // flash-circle, star-circle, heart-circle, plus-circle
];

function getIcon(lastSeen) {
  const diff = new Date() - new Date(lastSeen);
  const onlineNow = diff < 30 * 1000;
  return onlineNow ? 'eye-circle' : null;
}

export default function StatusBadge({ statusColor, style, size, lastSeen }) {
  const diff = new Date() - new Date(lastSeen);
  const onlineNow = diff < 30 * 1000;
  const [icon, setIcon] = React.useState(getIcon(lastSeen));
  const { backgrounds } = useLight();

  useInterval(
    () => {
      setIcon(getIcon(lastSeen));
    },
    onlineNow ? 2000 : 1000 * 60 * 60
  );
  return (
    <View
      style={{
        ...style,
        backgroundColor: backgrounds[0],
        height: size,
        width: size,
        borderRadius: 50,
      }}
    >
      <MaterialCommunityIcons
        name={icon || colorIcons[statusColor]}
        size={size}
        color={statusColors[statusColor]}
        // style={style}
      />
    </View>
  );
}
