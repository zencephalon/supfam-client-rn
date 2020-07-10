import React from 'react';
import { View } from 'react-native';

import { formatMessageTimeflag } from '~/lib/clockwork';

import useLight from '~/h/useLight';

import SfText from '~/c/SfText';

export default function MessageSentTimeText({ sentDate }) {
	const { foregrounds } = useLight();
	const _sentDate = new Date(sentDate);
	const timeFlag = formatMessageTimeflag(_sentDate);

	return (
		<View
			style={{
				alignItems: 'center',
				marginTop: 16,
				marginBottom: 8,
			}}
		>
			<SfText
				style={{
					color: foregrounds[2],
					fontSize: 16,
				}}
			>
				{timeFlag}
			</SfText>
		</View>
	);
}
