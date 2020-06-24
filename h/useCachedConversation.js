import { useQuery } from 'react-query';

export default function useCachedProfile(conversationId) {
  const { data: conversation } = useQuery(
    ['conversation', conversationId],
    () => {},
    {
      staleTime: Infinity,
      enabled: conversationId,
    }
  );

  return conversation;
}
