import MmkvStorage from 'react-native-mmkv-storage';

const store = new MmkvStorage.Loader().withInstanceID('messages').initialize();

export const storeMessage = (messageId: number, message) => {
	return store.setMapAsync(`${messageId}`, message);
};

export const getMessage = (messageId: number) => {
	return store.getMapAsync(`${messageId}`);
};
