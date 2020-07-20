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

	// Stupid hack, some React.memo components won't know to update
	// unless we make it obvious for them using a useState
	// In theory useContext should take care of it, but it seems
	// like useQuery's useContext does special caching magic that
	// makes this not update the component as normal
	React.useEffect(() => {
		setProfile(_profile);
	}, [_profile]);

	return _profile;
}
