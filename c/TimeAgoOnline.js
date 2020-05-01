import React, { useState, useMemo } from 'react';
import formatAgo from '~/lib/timeAgo';
import useInterval from '@use-it/interval';

import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { nord8 } from '~/constants/Colors';

import useLight from '~/h/useLight';

const getDisplay = (time) => {
  const human = formatAgo(time);
  return human;
};

const getInterval = (timeDisplay) => {
  if (timeDisplay === 'now') {
    return 100;
  }
  if (timeDisplay.endsWith('s')) {
    return 500;
  }
  if (timeDisplay.endsWith('m')) {
    return 1000 * 60;
  }
  if (timeDisplay.endsWith('h')) {
    return 1000 * 60 * 60;
  }
  return 1000 * 60 * 60 * 24;
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
    <React.Fragment>
      <MaterialCommunityIcons
        name="eye-off-outline"
        style={{ alignSelf: 'center', marginLeft: 4 }}
        size={14}
        color={textTertiary}
      />
      <Text
        style={{
          textAlign: 'left',
          color: textTertiary,
        }}
      >
        {timeDisplay + suffixEnding}
      </Text>
    </React.Fragment>
  );
};
export default TimeAgo;
