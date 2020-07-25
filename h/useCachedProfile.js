import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { updateCachedProfile } from '~/lib/QueryCache';

import { getProfile } from '~/apis/api';

export default function useCachedProfile(profileId) {
	const { data: _profile } = useQuery(['friend', profileId], getProfile, {
		enabled: profileId,
		onSuccess: (profile) => {
			updateCachedProfile(profile.id, () => profile);
		},
	});
	const profile = useSelector((state) => state.profileCache?.[profileId]);

	return profile || _profile;
}
