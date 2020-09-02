import React from 'react';
import { storeConversation, getConversation } from '~/lib/ConversationStore';

const DEFAULT_CONVERSATION_STATE = {
	messages: [],
	latestSyncMessageId: null,
};

export default function useConversation(
	conversationId: number,
	meProfileId: number
) {
	const [loadedFromStore, setLoadedFromStore] = React.useState(false);
	const [conversationState, setConversationState] = React.useState(null);

	React.useEffect(() => {
		getConversation(conversationId)
			.then((conversationState) => {
				setLoadedFromStore(true);

				setConversationState(conversationState);
			})
			.catch(() => {
				setLoadedFromStore(true);

				setConversationState(DEFAULT_CONVERSATION_STATE);
			});
	}, []);

	const sync = React.useCallback(() => {
		// make API call to get message previous to now, merge into messages
	}, []);
}
