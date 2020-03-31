import React, { useState, useMemo } from 'react';
import formatAgo from '~/lib/timeAgo';
import useInterval from '@use-it/interval';

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

  const isNow = timeDisplay === 'now';
  // const suffixEnding = isNow ? '' : ` ${suffix}`;
  const suffixEnding = '';
  return <React.Fragment>{timeDisplay + suffixEnding}</React.Fragment>;
};
export default TimeAgo;
