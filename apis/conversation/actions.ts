import * as t from './actionTypes';
import ConversationState from '~/t/ConversationState';
import Message from '~/t/Message';

export const SELECT = (conversationId: number) => ({
	type: t.SELECT,
	conversationId,
});

export const SET_INITIAL = (
	conversationId: number,
	state: ConversationState
) => ({
	type: t.SET_INITIAL,
	conversationId,
	state,
});

export const RECEIVE_MESSAGES = (
	conversationId: number,
	messages: Message[]
) => ({
	type: t.RECEIVE_MESSAGES,
	conversationId,
	messages,
});

export const QUEUE_MESSAGE = (conversationId: number, message: Message) => ({
	type: t.QUEUE_MESSAGE,
	conversationId,
	message,
});
