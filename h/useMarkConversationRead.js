import * as React from 'react';

import { postConversationRead } from '~/apis/api';

export default function useReadConversation(conversationId) {
  React.useEffect(() => {
    if (conversationId) {
      postConversationRead(conversationId);
    }

    return () => {
      if (conversationId) {
        postConversationRead(conversationId);
      }
    };
  }, [conversationId]);
}
