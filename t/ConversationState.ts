export default interface ConversationState {
	messages: Record<string, unknown>[];
	latestSyncMessageId?: number;
}
