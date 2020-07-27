import * as React from 'react';

import SfText from '~/c/SfText';
import { isRecent, statusOpacity } from '~/lib/clockwork';
import useInterval from '@use-it/interval';

import useCachedProfile from '~/h/useCachedProfile';

export const StatusMessageText = React.memo(function StatusMessageText_({
	updatedAt,
	statusMessage,
}: {
	updatedAt: string;
	statusMessage: string;
}) {
	const recentUpdate = isRecent(updatedAt);
	const opacity = statusOpacity(updatedAt);

	const [time, setTime] = React.useState(new Date());
	// Refresh the display once a minute
	useInterval(() => setTime(new Date()), 60 * 1000);

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
				marginBottom: 8,
			}}
		>
			{statusMessage}
		</SfText>
	);
});

export default function StatusMessageTextFromProfileId({
	profileId,
}: {
	profileId: number;
}) {
	const profile = useCachedProfile(profileId);

	if (!profile) {
		return null;
	}

	const statusMessage = profile.status?.message;
	const updatedAt = profile.status?.updated_at;

	return (
		<StatusMessageText statusMessage={statusMessage} updatedAt={updatedAt} />
	);
}
