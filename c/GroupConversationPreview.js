import * as React from 'react';

import useCachedConversationMembership from '~/h/useCachedConversationMembership';

import MessagePreview from '~/c/MessagePreview';

export default function GroupConversationPreview({ conversationId }) {
	const membership = useCachedConversationMembership(conversationId);

	if (!membership) {
		return null;
	}

	const last_message = membership?.last_message;
	const last_message_id = last_message?.id;
	const last_read_message_id = membership?.last_read_message_id;

	if (!last_message_id) {
		return null;
	}

	return <MessagePreview messageText={last_message?.message} messageType={last_message?.type} read={last_message_id === last_read_message_id} />;
}
