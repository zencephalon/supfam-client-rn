import React, { useState } from 'react';
// import formatAgo from '~/lib/timeAgo';
import useInterval from '@use-it/interval';

const getDisplay = (time) => {
	return (new Date() - time > 1500) ? '...paused' : 'typing...';
};

const TypingText = ({ time }) => {
	const [timeDisplay, setTimeDisplay] = useState(getDisplay(time));

	useInterval(() => {
		const display = getDisplay(time);
		setTimeDisplay(display);
	}, 1000);

	return <React.Fragment>{timeDisplay}</React.Fragment>;
};
export default TypingText;
