import React from 'react';

import { useSelector } from 'react-redux';
import { SET_INITIAL, RECEIVE_MESSAGES } from '~/apis/conversation/actions';
import store from '~/store/store';

import { useFocusEffect } from '@react-navigation/native';
import { uniqBy, last, sortBy, values, merge } from 'lodash';

import Message from '~/t/Message';

import { useQuery } from 'react-query';
import { cacheMessage } from '~/lib/QueryCache';
import Cable from '~/lib/Cable';
import MessageQueue from '~/lib/MessageQueue';

import {
	storeConversation,
	getConversation,
	DEFAULT_CONVERSATION_STATE,
} from '~/lib/ConversationStore';
import {
	getConversationMessagesSync,
	getConversationMessages,
} from '~/apis/api';
import ConversationState from '~/t/ConversationState';
import mergeSortedIds from '~/lib/mergeSortedIds';

type SetConversationState = React.Dispatch<
	React.SetStateAction<ConversationState>
>;

type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

function useStateFromStore(
	conversationId: number,
	setloadingFromStore: SetBooleanState
) {
	React.useEffect(() => {
		if (!conversationId) {
			return;
		}

		getConversation(conversationId)
			.then((conversationState) => {
				store.dispatch(SET_INITIAL(conversationId, conversationState));
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
		storeConversation(conversationId, conversationState);
	}, [conversationState]);
}

function useSync(
	conversationId: number,
	loadingFromStore: boolean,
	latestSyncMessageId: number | undefined,
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
				store.dispatch(RECEIVE_MESSAGES(conversationId, _messages));
				setSyncing(false);
			}
		);
	}, [loadingFromStore, conversationId, latestSyncMessageId]);
}

function useFetchMore(
	conversationId: number,
	earliestMessageId: number,
	setCanFetchMore: SetBooleanState
) {
	return React.useCallback(() => {
		getConversationMessages(conversationId, earliestMessageId).then(
			({ messages }: { messages: Message[] }) => {
				if (messages.length === 0) {
					setCanFetchMore(false);
					return;
				}
				store.dispatch(RECEIVE_MESSAGES(conversationId, messages));
			}
		);
	}, [conversationId, earliestMessageId]);
}

function useInstantMessages(conversationId: number, meProfileId: number) {
	const instantMessages = useSelector(
		(state) => state.instantMessages[conversationId]
	);

	return sortBy(values(instantMessages), 'profile_id');
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

	useStateFromStore(conversationId, setloadingFromStore);
	const conversationState =
		useSelector((state) => state.conversation.conversations[conversationId]) ||
		DEFAULT_CONVERSATION_STATE;
	useStoreState(conversationId, loadingFromStore, conversationState);

	const instantMessages = useInstantMessages(conversationId, meProfileId);
	const queuedMessages = conversationState.queuedMessages;

	const sync = useSync(
		conversationId,
		loadingFromStore,
		conversationState.latestSyncMessageId,
		setSyncing
	);
	const fetchMore = useFetchMore(
		conversationId,
		last(conversationState.messages)?.id,
		setCanFetchMore
	);

	React.useEffect(sync, [loadingFromStore]);
	useFocusEffect(sync);

	const messages = React.useMemo(() => {
		return instantMessages.concat(queuedMessages, conversationState.messages);
	}, [instantMessages, queuedMessages, conversationState.messages]);

	console.log(messages, conversationState);

	return {
		messages,
		fetchMore,
		canFetchMore,
		loading: loadingFromStore || syncing,
	};
}
