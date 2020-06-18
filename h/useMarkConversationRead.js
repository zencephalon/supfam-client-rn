import * as React from 'react';

import { postConversationRead } from '~/apis/api';
import { refetchConversationMemberships } from '~/lib/QueryCache';

function markRead(conversationId, dmId, messageId) {
  if (!conversationId) {
    return;
  }
  postConversationRead(conversationId, messageId);
}

export default function useReadConversation(conversationId, dmId, messageId) {
  React.useEffect(() => {
    markRead(conversationId, dmId, messageId);
  }, [conversationId, dmId, messageId]);
}
