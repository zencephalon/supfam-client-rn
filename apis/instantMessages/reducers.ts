import * as t from './actionTypes';
import { omit } from 'lodash';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case t.RECEIVE:
			if (state[action.conversationId]?.[action.message.id]) {
				return state;
			}
			return {
				...state,
				[action.conversationId]: {
					...(state[action.conversationId] || {}),
					[action.message.id]: action.message,
				},
			};
		case t.REMOVE:
			if (!state[action.conversationId]?.[action.messageId]) {
				return state;
			}

			return {
				...state,
				[action.conversationId]: omit(state[action.conversationId] || {}, [
					action.messageId,
				]),
			};

		default:
			return state;
	}
}
