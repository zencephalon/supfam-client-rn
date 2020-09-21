import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useGoGroupSettings(conversationId: number) {
	const navigation = useNavigation();
	const goToGroupSettings = React.useCallback(
		() => navigation.navigate('Group Settings', { conversationId }),
		[navigation, conversationId]
	);

	return goToGroupSettings;
}
