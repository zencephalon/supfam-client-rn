import { useNavigation } from '@react-navigation/native';
import React from 'react';

enum QuoteType {
	message = 'message',
	status = 'status',
}

export default function useOpenReplyModal(
	profileId: number,
	quoted: string,
	quoteType: QuoteType,
	conversationId?: number
) {
	const navigation = useNavigation();

	return React.useCallback(() => {
		navigation.navigate('Reply Modal', {
			profileId,
			quoted,
			quoteType,
			conversationId,
		});
	}, [profileId, quoted, quoteType, conversationId]);
}
