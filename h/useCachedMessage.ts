import React from 'react';
import { useSelector } from 'react-redux';
import { getMessage } from '~/lib/MessageStore';

export default function useCachedMessage(messageId: number) {
	const [message, setMessage] = React.useState(null);
	// const message = useSelector((state) => state.messageCache[messageId]);
	React.useEffect(() => {
		getMessage(messageId).then((message) => setMessage(message));
	}, []);

	return message;
}
