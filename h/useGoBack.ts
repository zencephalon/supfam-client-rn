import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useGoBack() {
	const navigation = useNavigation();

	return React.useCallback(() => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		} else {
			navigation.navigate('Home')
		}
	}, [navigation])
}