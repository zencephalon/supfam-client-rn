import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useGoHome() {
	const navigation = useNavigation();
	const goHome = React.useCallback(() => navigation.navigate('Home'), [
		navigation,
	]);
	return goHome;
}
