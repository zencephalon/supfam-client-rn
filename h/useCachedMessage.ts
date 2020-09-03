import React from 'react';
import { useSelector } from 'react-redux';
import { getMessage } from '~/lib/MessageStore';

export default function useCachedMessage(messageId: number, local: boolean) {
	if (!local) {
		return;
	}

	const message = useSelector((state) => state.messageCache[messageId]);

	return message;
}
