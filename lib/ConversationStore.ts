import MmkvStorage from 'react-native-mmkv-storage';
import ConversationState from '~/t/ConversationState';
import MessageQueue from '~/lib/MessageQueue';

export const store = new MmkvStorage.Loader()
	.withInstanceID('conversations')
	.initialize();

export const DEFAULT_CONVERSATION_STATE: ConversationState = {
	messages: [],
	queuedMessages: [],
	latestSyncMessageId: undefined,
};

export const storeConversation = (
	conversationId: number,
	conversationState: ConversationState
): Promise<boolean> => {
	return store.setMapAsync(`${conversationId}`, {
		...conversationState,
		messages: conversationState.messages.slice(0, 50),
	});
};

export const getConversation = (conversationId: number) => {
	const queuedMessages = MessageQueue.getQueued(conversationId);
	const promise = store.getMapAsync(`${conversationId}`) as Promise<
		ConversationState
	>;

	return promise.then((conversationState: ConversationState) => {
		return {
			...DEFAULT_CONVERSATION_STATE,
			...conversationState,
			queuedMessages,
		};
	});
};
