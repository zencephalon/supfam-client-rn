import { useSelector } from 'react-redux';

export default function useCachedProfile(profileId) {
	const profile = useSelector((state) => state.profileCache[profileId]);

	return profile;
}
