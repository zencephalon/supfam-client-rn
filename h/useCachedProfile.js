import React from 'react';
import { useQuery } from 'react-query';

import { getProfile } from '~/apis/api';

export default function useCachedProfile(profileId) {
	const { data: _profile } = useQuery(['friend', profileId], getProfile, {
		// staleTime: Infinity,
		// manual: true,
		// staleTime: 60 * 1000,
		enabled: profileId,
	});

	return _profile;
}
