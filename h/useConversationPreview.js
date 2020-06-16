import { useQuery } from 'react-query';
import { getConversationPreview } from '~/apis/api';

export default function useConversationPreview(conversationId) {
  const { data: message, status } = useQuery(
    conversationId && ['conversationPreview', conversationId],
    getConversationPreview
  );

  return { message, reqState: status };
}
