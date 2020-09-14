import React from 'react';

import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { uniqBy, last, sortBy, values } from 'lodash';

import Message from '~/t/Message';

import { useQuery } from 'react-query';
import {
	cacheMessage,
	clearReceivedMessages,
	removeQueuedMessages,
} from '~/lib/QueryCache';
import Cable from '~/lib/Cable';
import MessageQueue from '~/lib/MessageQueue';

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
	setloadingFromStore: SetBooleanState
) {
	React.useEffect(() => {
		if (!conversationId) {
			return;
		}

		getConversation(conversationId)
			.then((conversationState) => {
				setConversationState(conversationState);
				conversationState.messages.forEach((message) => {
					cacheMessage(message);
				});
				setloadingFromStore(false);
			})
			.catch(() => {
				setloadingFromStore(false);
			});
	}, [conversationId]);
}

function useStoreState(
	conversationId: number,
	loadingFromStore: boolean,
	conversationState: ConversationState
) {
	React.useEffect(() => {
		if (!conversationId || loadingFromStore) {
			return;
		}
		console.log('convoState', conversationState);
		storeConversation(conversationId, conversationState);
	}, [conversationState]);
}

function useSync(
	conversationId: number,
	loadingFromStore: boolean,
	latestSyncMessageId: number | undefined,
	setConversationState: SetConversationState,
	setSyncing: SetBooleanState
) {
	return React.useCallback((): void => {
		if (!conversationId || loadingFromStore) {
			return;
		}
		setSyncing(true);
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
				setSyncing(false);
			}
		);
	}, [
		loadingFromStore,
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
			return state;
		});

		// removeQueuedMessages(
		// 	conversationId,
		// 	receivedMessages.map((m) => m.qid)
		// );

		clearReceivedMessages(conversationId);
	}, [receivedMessages]);
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
					setCanFetchMore(false);
					return;
				}
				setConversationState((conversationState) => {
					const state = {
						...conversationState,
						messages: mergeSortedIds(conversationState.messages, messages),
					};
					return state;
				});
			}
		);
	}, [conversationId, earliestMessageId, setConversationState]);
}

function useInstantMessages(conversationId: number, meProfileId: number) {
	const instantMessages = useSelector(
		(state) => state.instantMessages[conversationId]
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
	const [syncing, setSyncing] = React.useState(true);
	const [loadingFromStore, setloadingFromStore] = React.useState(true);
	const [conversationState, setConversationState] = React.useState(
		DEFAULT_CONVERSATION_STATE
	);

	useStateFromStore(conversationId, setConversationState, setloadingFromStore);
	useStoreState(conversationId, loadingFromStore, conversationState);
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
		loadingFromStore,
		conversationState.latestSyncMessageId,
		setConversationState,
		setSyncing
	);
	const fetchMore = useFetchMore(
		conversationId,
		last(conversationState.messages)?.id,
		setConversationState,
		setCanFetchMore
	);

	React.useEffect(sync, [loadingFromStore]);
	useFocusEffect(sync);

	const messages = React.useMemo(() => {
		console.log('having to recompute messages');
		return instantMessages.concat(queuedMessages, conversationState.messages);
	}, [instantMessages, queuedMessages, conversationState.messages]);

	return {
		messages,
		fetchMore,
		canFetchMore,
		loading: loadingFromStore || syncing,
	};
}
