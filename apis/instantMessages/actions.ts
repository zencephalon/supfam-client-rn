import * as t from './actionTypes';
import Message from '~/t/Message';

export const RECEIVE = (conversationId: number, message: Message) => ({
	type: t.RECEIVE,
	conversationId,
	message,
});

export const REMOVE = (conversationId: number, messageId: number) => ({
	type: t.REMOVE,
	conversationId,
	messageId,
});
