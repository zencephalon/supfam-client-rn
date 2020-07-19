import * as React from 'react';

import SfText from '~/c/SfText';
import { isRecent, statusOpacity } from '~/lib/clockwork';

export default React.memo(function StatusMessageText({
	updatedAt,
	statusMessage,
}: {
	updatedAt: string;
	statusMessage: string;
}) {
	const recentUpdate = isRecent(updatedAt);
	const opacity = statusOpacity(updatedAt);

	return (
		<SfText
			style={{
				fontSize: 16,
				flexGrow: 1,
				flexShrink: 1,
				marginLeft: 8,
				overflow: 'hidden',
				opacity: opacity,
				fontWeight: recentUpdate ? 'bold' : 'normal',
			}}
		>
			{statusMessage}
		</SfText>
	);
});
