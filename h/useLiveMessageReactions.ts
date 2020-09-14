import { useQuery } from 'react-query';

const noop = () => {};

export default function useLiveMessageReactions(messageId: number) {
	const { data: reactions } = useQuery(['messageReactions', messageId], noop, {
		manual: true,
	});

	return { reactions };
}
