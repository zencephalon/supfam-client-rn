import * as React from 'react';

import { postConversationRead } from '~/apis/api';
import { refetchConversationMemberships } from '~/lib/QueryCache';

function markRead(conversationId, dmId) {
  if (!conversationId) {
    return;
  }
  postConversationRead(conversationId);
}

export default function useReadConversation(conversationId, dmId) {
  React.useEffect(() => {
    markRead(conversationId, dmId);

    return () => {
      markRead(conversationId, dmId);
      refetchConversationMemberships();
    };
  }, [conversationId, dmId]);
}
