import { useQuery } from 'react-query';
import React from 'react';
import Cable from '~/lib/Cable';

export default function useConversationPresence(conversationId, meProfileId) {
  const { data: presence } = useQuery(
    ['conversationPresence', conversationId],
    () => {},
    {
      // staleTime: Infinity,
      manual: true,
      initialData: {},
    }
  );

  React.useEffect(() => {
    Cable.subscribeConversationPresence(conversationId, meProfileId);
    return () => {
      Cable.unsubscribeConversationPresence(conversationId);
    };
  }, [conversationId, meProfileId]);

  return { presence };
}
