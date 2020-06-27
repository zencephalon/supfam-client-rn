import React, { useState, useMemo } from 'react';
import formatAgo from '~/lib/timeAgo';
import useInterval from '@use-it/interval';

import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useLight from '~/h/useLight';

const getDisplay = (time) => {
  const human = formatAgo(time);
  return human;
};

const getInterval = (timeDisplay) => {
  if (timeDisplay === 'now') {
    return 500;
  }
  if (timeDisplay.endsWith('s')) {
    return 1000;
  }
  // Default value must be at most 1 minute due to how React Native on Android handles timers.
  return 1000 * 60;
};

const TimeAgo = ({ time }) => {
  const [timeDisplay, setTimeDisplay] = useState(getDisplay(time));

  const interval = useMemo(() => getInterval(getDisplay(time)), [time]);

  const { foregrounds } = useLight();
  const textTertiary = foregrounds[3];

  useInterval(() => {
    setTimeDisplay(getDisplay(time));
  }, interval);

  if (!time) {
    return (
      <MaterialCommunityIcons
        name="eye-off-outline"
        style={{ alignSelf: 'center', marginLeft: 6 }}
        size={14}
        color={textTertiary}
      />
    );
  }

  const diff = new Date() - new Date(time);

  if (diff < 30 * 1000) {
    return (
      <MaterialCommunityIcons
        name="eye-outline"
        style={{ alignSelf: 'center', marginLeft: 6 }}
        size={14}
        color={foregrounds[1]}
      />
    );
  }

  const isNow = timeDisplay === 'now';
  // const suffixEnding = isNow ? '' : ` ${suffix}`;
  const suffixEnding = '';

  return (
    <View style={{ marginRight: 2, flexDirection: 'row' }}>
      <Text
        style={{
          textAlign: 'left',
          color: textTertiary,
          textAlignVertical: 'bottom',
        }}
      >
        {timeDisplay + suffixEnding}
      </Text>
      <MaterialCommunityIcons
        name="eye-off-outline"
        style={{ alignSelf: 'center' }}
        size={14}
        color={textTertiary}
      />
    </View>
  );
};
export default TimeAgo;
