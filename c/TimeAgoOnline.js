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
  const display = getDisplay(time);
  const [timeDisplay, setTimeDisplay] = useState(getDisplay(time));

  const interval = useMemo(() => getInterval(getDisplay(time)), [time]);

  // Fix problem where sometimes the `time` changes but we didn't refresh the display
  // until the interval kicked in.
  React.useEffect(() => {
    setTimeDisplay(getDisplay(time));
  }, [time]);

  useInterval(() => {
    setTimeDisplay(getDisplay(time));
  }, interval);

  const { foregrounds } = useLight();
  const textTertiary = foregrounds[3];

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

  return (
    <View style={{ marginRight: 2, flexDirection: 'row' }}>
      <Text
        style={{
          textAlign: 'left',
          color: textTertiary,
          textAlignVertical: 'bottom',
          marginRight: 1,
        }}
      >
        {timeDisplay}
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
export default React.memo(TimeAgo);
