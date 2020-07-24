import * as t from './actionTypes';

export const CACHE = (messageId, message) => ({
	type: t.CACHE,
	messageId,
	message,
});
