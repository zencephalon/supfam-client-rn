import React from 'react';

import sendInstant from '~/lib/sendInstant';

import MessageQueue from '~/lib/MessageQueue';

export default function useSubmitMessage(text, conversationId, meProfileId) {
  return React.useCallback(async () => {
    if (text === '') {
      return;
    }
    sendInstant(conversationId, text);
    MessageQueue.sendMessage(meProfileId, conversationId, {
      message: text,
      type: 0,
    });
  }, [text, conversationId, meProfileId]);
}
