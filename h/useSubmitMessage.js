import React from 'react';

import sendInstant from '~/lib/sendInstant';

import MessageQueue from '~/lib/MessageQueue';

export default function useSubmitMessage(conversationId, meProfileId) {
  return React.useCallback(
    (text) => {
      console.log('submitted', text);
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
