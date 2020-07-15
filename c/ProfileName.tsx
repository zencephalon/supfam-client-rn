import * as React from 'react';
import SfText from '~/c/SfText';

import useCachedProfile from '~/h/useCachedProfile';

export default function ProfileName({
	profileId,
}: {
	profileId: number;
}): string {
	const profile = useCachedProfile(profileId);

	return profile?.name || '';
}
