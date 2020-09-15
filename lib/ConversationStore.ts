import MmkvStorage from 'react-native-mmkv-storage';
import ConversationState from '~/t/ConversationState';

const store = new MmkvStorage.Loader()
	.withInstanceID('conversations')
	.initialize();

export const DEFAULT_CONVERSATION_STATE: ConversationState = {
	messages: [],
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
	const promise = store.getMapAsync(`${conversationId}`) as Promise<
		ConversationState
	>;

	return promise.then((conversationState: ConversationState) => {
		return { ...DEFAULT_CONVERSATION_STATE, ...conversationState };
	});
};
