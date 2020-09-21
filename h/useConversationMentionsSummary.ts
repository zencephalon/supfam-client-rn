import { useQuery } from 'react-query';
import { getConversationMentionsSummary } from '~/apis/api';

export default function useConversationsMentionsSummary(
	conversationId: number
) {
	const { data: summary, status } = useQuery(
		['conversationMentionsSummary', conversationId],
		getConversationMentionsSummary,
		{
			enabled: conversationId,
		}
	);

	return { summary: summary || [], reqState: status };
}
