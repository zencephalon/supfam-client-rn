import React from 'react';

import { sendMessage } from '~/apis/api';
import sendInstant from '~/lib/sendInstant';

export default function useSubmitMessage(text, conversationId, meProfileId) {
  return React.useCallback(async () => {
    if (text === '') {
      return;
    }
    sendInstant(conversationId, text);
    return sendMessage({
      meProfileId,
      conversationId,
      data: { message: { message: text, type: 0 } },
    });
  }, [text, conversationId, meProfileId]);
}
