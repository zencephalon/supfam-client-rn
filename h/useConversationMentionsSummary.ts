import { useQuery } from 'react-query';
import { getConversationMentionsSummary } from '~/apis/api';

type SummaryReturn = [number, string, string];

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

	return {
		summary: (summary || []).map(
			([profileId, profileName, userName]: SummaryReturn) => ({
				profileId,
				profileName,
				userName,
				profileNameLower: profileName.toLowerCase(),
				userNameLower: userName.toLowerCase(),
			})
		),
		reqState: status,
	};
}
