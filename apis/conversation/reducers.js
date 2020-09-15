import * as t from './actionTypes';
import mergeSortedIds from '~/lib/mergeSortedIds';

export default function reducer(
	state = { conversationId: undefined, conversations: {} },
	action
) {
	const oldConversation = state.conversations[action.conversationId];
	switch (action.type) {
		case t.SELECT:
			return {
				...state,
				conversationId: action.conversationId,
			};
		case t.SET_INITIAL:
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.conversationId]: action.state,
				},
			};
		case t.RECEIVE_MESSAGES:
			if (!oldConversation) {
				return state;
			}
			const qids = action.messages.map((m) => m.qid);
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.conversationId]: {
						...oldConversation,
						messages: mergeSortedIds(oldConversation.messages, action.messages),
						queuedMessages: oldConversation.queuedMessages.filter(
							(m) => !qids.includes(m.qid)
						),
					},
				},
			};
		case t.QUEUE_MESSAGE:
			if (!oldConversation) {
				return state;
			}
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.conversationId]: {
						...oldConversation,
						queuedMessages: [action.message, ...oldConversation.queuedMessages],
					},
				},
			};
		default:
			return state;
	}
}
