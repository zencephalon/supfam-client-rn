import MmkvStorage from 'react-native-mmkv-storage';
import ConversationState from '~/t/ConversationState';

const store = new MmkvStorage.Loader()
	.withInstanceID('conversations')
	.initialize();

export const storeConversation = (
	conversationId: number,
	conversationState: ConversationState
): Promise<{}> => {
	return store.setMapAsync(`${conversationId}`, {
		...conversationState,
		messages: conversationState.messages.slice(0, 50),
	});
};

export const getConversation = (conversationId: number) => {
	return store.getMapAsync(`${conversationId}`) as Promise<ConversationState>;
};
