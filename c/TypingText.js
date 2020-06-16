import React, { useState } from 'react';
// import formatAgo from '~/lib/timeAgo';
import useInterval from '@use-it/interval';

const getDisplay = time => {
  return new Date() - time > 1500 ? 'paused' : 'typing';
};

const TypingText = ({ time, suffix }) => {
  const [timeDisplay, setTimeDisplay] = useState(getDisplay(time));

  useInterval(() => {
    setTimeDisplay(getDisplay(time));
  }, 500);

  const isNow = timeDisplay === 'now';
  // const suffixEnding = isNow ? '' : ` ${suffix}`;
  const suffixEnding = '';
  return <React.Fragment>{timeDisplay + suffixEnding}</React.Fragment>;
};
export default TypingText;
