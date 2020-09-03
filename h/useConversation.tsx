import React from 'react';
import { storeConversation, getConversation } from '~/lib/ConversationStore';
import { getConversationMessagesSync } from '~/apis/api';
import ConversationState from '~/t/ConversationState';

const DEFAULT_CONVERSATION_STATE: ConversationState = {
	messages: [],
	latestSyncMessageId: undefined,
};

export default function useConversation(
	conversationId: number,
	meProfileId: number
) {
	const [loadedFromStore, setLoadedFromStore] = React.useState(false);
	const [conversationState, setConversationState] = React.useState(
		DEFAULT_CONVERSATION_STATE
	);

	React.useEffect(() => {
		getConversation(conversationId)
			.then((conversationState) => {
				setLoadedFromStore(true);

				setConversationState(conversationState);
			})
			.catch(() => {
				setLoadedFromStore(true);
			});
	}, []);

	const sync = React.useCallback(() => {
		// make API call to get message previous to now, merge into messages
		getConversationMessagesSync(
			conversationId,
			conversationState.latestSyncMessageId
		).then((messages) => {});
	}, [conversationId, conversationState.latestSyncMessageId]);
}
