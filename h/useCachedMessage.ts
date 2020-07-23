import { useQuery } from 'react-query';

export default function useCachedMessage(messageId: number) {
	const { data: message } = useQuery(['message', messageId], () => {}, {
		enabled: messageId,
		manual: true,
	});

	return message;
}
