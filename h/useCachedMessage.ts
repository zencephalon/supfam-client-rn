import { useSelector } from 'react-redux';

export default function useCachedMessage(messageId: number) {
	const message = useSelector((state) => state.messageCache[messageId]);

	return message;
}
