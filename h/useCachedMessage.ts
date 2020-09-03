import { useSelector } from 'react-redux';

export default function useCachedMessage(messageId: number, local: boolean) {
	if (!local) {
		return;
	}

	const message = useSelector((state) => state.messageCache[messageId]);

	return message;
}
