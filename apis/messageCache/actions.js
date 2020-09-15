import * as t from './actionTypes';

export const CACHE = (messageId, message) => ({
	type: t.CACHE,
	messageId,
	message,
});

export const MULTI_CACHE = (messages) => ({
	type: t.MULTI_CACHE,
	messages,
});
