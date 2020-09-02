import MmkvStorage from 'react-native-mmkv-storage';

const store = new MmkvStorage.Loader().withInstanceID('messages').initialize();

export const storeMessage = (messageId: string, message) => {
	store.setMapAsync(messageId, message);
};

export const getMessage = (messageId: string) => {
	return store.getMapAsync(messageId);
};
