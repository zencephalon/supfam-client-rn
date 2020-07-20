import React from 'react';
import { useQuery } from 'react-query';

import { getProfile } from '~/apis/api';

export default function useCachedProfile(profileId) {
	const [profile, setProfile] = React.useState(null);
	const { data: _profile } = useQuery(['friend', profileId], getProfile, {
		// staleTime: Infinity,
		// manual: true,
		staleTime: 60 * 1000,
		enabled: profileId,
	});
	React.useEffect(() => {
		setProfile(_profile);
	}, [_profile]);

	return profile;
}
