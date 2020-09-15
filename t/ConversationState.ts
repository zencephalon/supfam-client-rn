import Message from '~/t/Message';

export default interface ConversationState {
	messages: Message[];
	queuedMessages: Message[];
	latestSyncMessageId?: number;
}
