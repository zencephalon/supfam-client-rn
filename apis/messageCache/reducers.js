import * as t from './actionTypes';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case t.CACHE:
			return {
				...state,
				[action.messageId]: action.message,
			};
		default:
			return state;
	}
}
