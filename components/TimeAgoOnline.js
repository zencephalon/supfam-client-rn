import React, { useState, useMemo } from 'react';
import formatAgo from '~/lib/timeAgo';
import useInterval from '@use-it/interval';

import { Text } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { nord10 } from '~/constants/Colors';

const getDisplay = time => {
  const human = formatAgo(time);
  return human;
};

const getInterval = timeDisplay => {
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

const TimeAgo = ({ time, suffix }) => {
  const [timeDisplay, setTimeDisplay] = useState(getDisplay(time));

  const interval = useMemo(() => getInterval(getDisplay(time)), [time]);

  useInterval(() => {
    setTimeDisplay(getDisplay(time));
  }, interval);

  if (!time) {
    return (
      <MaterialCommunityIcons
        name="eye-off-outline"
        style={{ alignSelf: 'center', marginLeft: 6 }}
        size={14}
        color="#BBB"
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
        color={nord10}
      />
    );
  }

  const isNow = timeDisplay === 'now';
  // const suffixEnding = isNow ? '' : ` ${suffix}`;
  const suffixEnding = '';

  return (
    <React.Fragment>
      <Text
        style={{
          textAlign: 'left',
          color: '#BBB',
          marginLeft: 6,
        }}
      >
        {timeDisplay + suffixEnding}
      </Text>
      <MaterialCommunityIcons
        name="eye-off-outline"
        style={{ alignSelf: 'center' }}
        size={14}
        color="#BBB"
      />
    </React.Fragment>
  );
};
export default TimeAgo;
