import MmkvStorage from 'react-native-mmkv-storage';
import Message from '~/t/Message';

const store = new MmkvStorage.Loader().withInstanceID('messages').initialize();

export const storeMessage = (messageId: number, message: Message) => {
	return store.setMapAsync(`${messageId}`, message);
};

export const getMessage = (messageId: number) => {
	return store.getMapAsync(`${messageId}`) as Promise<Message>;
};
