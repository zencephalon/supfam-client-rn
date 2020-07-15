import React from 'react';

import MessageQueue from '~/lib/MessageQueue';

export default function useSubmitMessage(conversationId, meProfileId) {
  return React.useCallback(
    (message) => {
      if (!message) {
        return;
      }
      console.log('trying to send', message);
      MessageQueue.sendMessage(meProfileId, conversationId, message);
    },
    [conversationId, meProfileId]
  );
}
