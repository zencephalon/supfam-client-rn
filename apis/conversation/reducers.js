import * as t from './actionTypes';
import mergeSortedIds from '~/lib/mergeSortedIds';

export default function reducer(
	state = { conversationId: undefined, conversations: {} },
	action
) {
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
			const oldConversation = state.conversations[action.conversationId];
			if (!oldConversation) {
				return state;
			}
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.conversationId]: {
						...oldConversation,
						messages: mergeSortedIds(oldConversation.messages, action.messages),
					},
				},
			};
		default:
			return state;
	}
}
