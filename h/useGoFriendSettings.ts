import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useGoFriendSettings(profileId: number) {
	const navigation = useNavigation();
	const goToProfile = React.useCallback(
		() => navigation.navigate('Friend Settings', { profileId }),
		[navigation, profileId]
	);

	return goToProfile;
}
