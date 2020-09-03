import Message from '~/t/Message';

import React from 'react';
import { storeConversation, getConversation } from '~/lib/ConversationStore';
import { getConversationMessagesSync } from '~/apis/api';
import ConversationState from '~/t/ConversationState';
import mergeSortedIds from '~/lib/mergeSortedIds';

const DEFAULT_CONVERSATION_STATE: ConversationState = {
	messages: [],
	latestSyncMessageId: undefined,
};

function useStateFromStore(
	conversationId: number,
	setConversationState: React.Dispatch<ConversationState>,
	setLoadedFromStore: React.Dispatch<boolean>
) {
	React.useEffect(() => {
		if (!conversationId) {
			return;
		}

		getConversation(conversationId)
			.then((conversationState) => {
				console.log('loadedState', conversationState);
				setConversationState(conversationState);
				setLoadedFromStore(true);
			})
			.catch(() => {
				setLoadedFromStore(true);
			});
	}, [conversationId]);
}

function useStoreState(
	conversationId: number,
	loadedFromStore: boolean,
	conversationState: ConversationState
) {
	React.useEffect(() => {
		if (!conversationId || !loadedFromStore) {
			return;
		}
		storeConversation(conversationId, conversationState);
	}, [conversationState]);
}

function useSync(
	conversationId: number,
	loadedFromStore: boolean,
	latestSyncMessageId: number,
	setConversationState: React.Dispatch<React.SetStateAction<ConversationState>>
) {
	return React.useCallback((): void => {
		if (!conversationId || !loadedFromStore) {
			return;
		}
		// make API call to get message previous to now, merge into messages
		getConversationMessagesSync(conversationId, latestSyncMessageId).then(
			(_messages: Message[]) => {
				// merge into messages
				setConversationState((conversationState) => {
					const messages = mergeSortedIds(
						conversationState.messages,
						_messages
					);
					const state = {
						...conversationState,
						messages,
						latestSyncMessageId: messages?.[0]?.id,
					};
					return state;
				});
			}
		);
	}, [
		loadedFromStore,
		conversationId,
		latestSyncMessageId,
		setConversationState,
	]);
}

export default function useConversation(
	conversationId: number,
	meProfileId: number
) {
	// subscribe to conversation

	const [loadedFromStore, setLoadedFromStore] = React.useState(false);
	const [conversationState, setConversationState] = React.useState(
		DEFAULT_CONVERSATION_STATE
	);

	console.log({ conversationId, loadedFromStore });

	useStateFromStore(conversationId, setConversationState, setLoadedFromStore);
	useStoreState(conversationId, loadedFromStore, conversationState);

	const sync = useSync(
		conversationId,
		loadedFromStore,
		conversationState.latestSyncMessageId,
		setConversationState
	);

	React.useEffect(sync, [loadedFromStore]);

	return { messages: conversationState.messages };
}
