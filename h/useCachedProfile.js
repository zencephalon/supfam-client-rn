import { useQuery } from 'react-query';

import { getProfile } from '~/apis/api';

export default function useCachedProfile(profileId) {
	const { data: _profile } = useQuery(['friend', profileId], getProfile, {
		enabled: profileId,
	});

	return _profile;
}
