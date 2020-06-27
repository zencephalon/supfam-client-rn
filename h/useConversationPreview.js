import { useQuery } from 'react-query';
import { getConversationPreview } from '~/apis/api';

export default function useConversationPreview(conversationId) {
  const { data: message, status } = useQuery(
    ['conversationPreview', conversationId],
    getConversationPreview,
    {
      enabled: conversationId,
    }
  );

  return { message, reqState: status };
}
