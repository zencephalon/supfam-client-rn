import { useNavigation } from '@react-navigation/native';
import React from 'react';

enum QuoteType {
	message = 'message',
	status = 'status',
}

export default function useOpenReplyModal(message: Object) {
	const navigation = useNavigation();

	return React.useCallback(() => {
		navigation.navigate('Message Modal', {
			message,
		});
	}, [message]);
}
