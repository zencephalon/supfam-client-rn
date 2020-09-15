import * as t from './actionTypes';

export default function reducer(state = {}, action) {
	const newState = { ...state };
	switch (action.type) {
		case t.CACHE:
			newState[action.messageId] = action.message;
			return newState;
		case t.MULTI_CACHE:
			action.messages.each((message) => {
				newState[message.id] = message;
			});
			return newState;
		default:
			return state;
	}
}
