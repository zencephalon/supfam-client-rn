import * as React from 'react';

import { postConversationRead } from '~/apis/api';
import { markConversationRead } from '~/lib/QueryCache';

function markRead(conversationId, messageId) {
	console.log('marking', messageId);
	if (!conversationId || !/^\d+$/.test(messageId)) {
		return;
	}
	postConversationRead(conversationId, messageId);
	markConversationRead(conversationId, messageId);
}

export default function useReadConversation(conversationId, messageId) {
	React.useEffect(() => {
		markRead(conversationId, messageId);
	}, [conversationId, messageId]);
}
