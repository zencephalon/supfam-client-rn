import React from 'react';

import MessageQueue from '~/lib/MessageQueue';

export default function useSubmitMessage(conversationId, meProfileId) {
  return React.useCallback(
    (text) => {
      if (text === '') {
        return;
      }
      MessageQueue.sendMessage(meProfileId, conversationId, {
        message: text,
        type: 0,
      });
    },
    [conversationId, meProfileId]
  );
}
