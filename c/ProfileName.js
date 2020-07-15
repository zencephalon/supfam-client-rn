import * as React from 'react';
import SfText from '~/c/SfText';

import useCachedProfile from '~/h/useCachedProfile';

export default function ProfileName(props) {
	const profile = useCachedProfile(props.profileId);

	if(!profile || !profile.name) {
		return <></>;
	}

	return profile?.name;
}
