import Message from '~/t/Message';

import { useQuery } from 'react-query';
import { clearReceivedMessages, removeQueuedMessage } from '~/lib/QueryCache';
import Cable from '~/lib/Cable';
import MessageQueue from '~/lib/MessageQueue';

import { uniqBy, last, sortBy, values } from 'lodash';

import React from 'react';
import { storeConversation, getConversation } from '~/lib/ConversationStore';
import {
	getConversationMessagesSync,
	getConversationMessages,
} from '~/apis/api';
import ConversationState from '~/t/ConversationState';
import mergeSortedIds from '~/lib/mergeSortedIds';

const DEFAULT_CONVERSATION_STATE: ConversationState = {
	messages: [],
	latestSyncMessageId: undefined,
};

type SetConversationState = React.Dispatch<
	React.SetStateAction<ConversationState>
>;

type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

function useStateFromStore(
	conversationId: number,
	setConversationState: SetConversationState,
	setLoadedFromStore: SetBooleanState
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
	latestSyncMessageId: number | undefined,
	setConversationState: SetConversationState
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

function useReceivedMessages(conversationId: number) {
	const { data: receivedMessages } = useQuery(
		['received_messages', { conversationId }],
		() => {},
		{
			manual: true,
			initialData: [],
			enabled: conversationId,
		}
	);

	return receivedMessages;
}

function useIncorporateReceivedMessages(
	conversationId: number,
	receivedMessages: Message[],
	setConversationState: SetConversationState
) {
	React.useEffect(() => {
		if (receivedMessages.length === 0) {
			return;
		}

		setConversationState((conversationState) => {
			const state = {
				...conversationState,
				messages: mergeSortedIds(conversationState.messages, receivedMessages),
			};
			storeConversation(conversationId, state);
			return state;
		});

		clearReceivedMessages(conversationId);
	}, [receivedMessages.length]);
}

function useFetchMore(
	conversationId: number,
	earliestMessageId: number,
	setConversationState: SetConversationState,
	setCanFetchMore: SetBooleanState
) {
	return React.useCallback(() => {
		getConversationMessages(conversationId, earliestMessageId).then(
			({ messages }: { messages: Message[] }) => {
				if (messages.length === 0) {
					console.log('Disabling FETCH MORE');
					setCanFetchMore(false);
					return;
				}
				setConversationState((conversationState) => {
					const state = {
						...conversationState,
						messages: mergeSortedIds(conversationState.messages, messages),
					};
					storeConversation(conversationId, state);
					return state;
				});
			}
		);
	}, [conversationId, earliestMessageId, setConversationState]);
}

function useInstantMessages(conversationId: number, meProfileId: number) {
	const { data: instantMessages } = useQuery(
		['instantMessages', conversationId],
		() => {},
		{
			manual: true,
			enabled: conversationId,
			initialData: {},
		}
	);

	return sortBy(
		values(instantMessages).filter(
			(msg: Message) => msg.profile_id !== meProfileId
		),
		'profile_id'
	);
}

function useQueuedMessages(conversationId: number) {
	const { data: queuedMessages } = useQuery(
		['queued_messages', { conversationId }],
		() => {},
		{
			manual: true,
			initialData: MessageQueue.getQueued(conversationId),
			enabled: conversationId,
		}
	);

	return queuedMessages;
}

export default function useConversation(
	conversationId: number,
	meProfileId: number
) {
	// subscribe to conversation
	React.useEffect(() => {
		Cable.subscribeConversation(conversationId, meProfileId);
		return () => {
			Cable.unsubscribeConversation(conversationId);
		};
	}, [conversationId]);

	const [canFetchMore, setCanFetchMore] = React.useState(true);
	const [loadedFromStore, setLoadedFromStore] = React.useState(false);
	const [conversationState, setConversationState] = React.useState(
		DEFAULT_CONVERSATION_STATE
	);

	console.log({ conversationId, loadedFromStore });

	useStateFromStore(conversationId, setConversationState, setLoadedFromStore);
	useStoreState(conversationId, loadedFromStore, conversationState);
	const instantMessages = useInstantMessages(conversationId, meProfileId);
	const queuedMessages = useQueuedMessages(conversationId);
	const receivedMessages = useReceivedMessages(conversationId);
	useIncorporateReceivedMessages(
		conversationId,
		receivedMessages || [],
		setConversationState
	);

	const sync = useSync(
		conversationId,
		loadedFromStore,
		conversationState.latestSyncMessageId,
		setConversationState
	);
	const fetchMore = useFetchMore(
		conversationId,
		last(conversationState.messages)?.id,
		setConversationState,
		setCanFetchMore
	);

	React.useEffect(sync, [loadedFromStore]);

	console.log({ queuedMessages, receivedMessages });

	const messages = React.useMemo(() => {
		let messages = instantMessages.concat(queuedMessages, receivedMessages);
		messages = uniqBy(messages, 'qid');
		messages = uniqBy(
			messages.concat(conversationState.messages.slice(0, 5)),
			'id'
		);

		return messages.concat(conversationState.messages.slice(5));
	}, [
		instantMessages,
		queuedMessages,
		receivedMessages,
		conversationState.messages,
	]);

	return {
		messages,
		// messages: conversationState.messages,
		fetchMore,
		canFetchMore,
	};
}
