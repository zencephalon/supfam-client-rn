import MmkvStorage from 'react-native-mmkv-storage';

const store = new MmkvStorage.Loader()
	.withInstanceID('conversations')
	.initialize();

export const storeConversation = (
	conversationId: number,
	conversationState
) => {
	// TODO only store the last 50 message
	return store.setMapAsync(`${conversationId}`, conversationState);
};

export const getConversation = (conversationId: number) => {
	return store.getMapAsync(`${conversationId}`);
};
