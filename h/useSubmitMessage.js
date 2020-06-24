import React from 'react';

import MessageQueue from '~/lib/MessageQueue';

export default function useSubmitMessage(conversationId, meProfileId) {
  return React.useCallback(
    (text, qid) => {
      if (text === '') {
        return;
      }
      MessageQueue.sendMessage(meProfileId, conversationId, {
        message: text,
        type: 0,
        qid,
      });
    },
    [conversationId, meProfileId]
  );
}
