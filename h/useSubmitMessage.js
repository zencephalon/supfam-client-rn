import React from 'react';

import { sendMessage } from '~/apis/api';
import sendInstant from '~/lib/sendInstant';

import Cable from '~/lib/Cable';

export default function useSubmitMessage(text, conversationId, meProfileId) {
  return React.useCallback(async () => {
    if (text === '') {
      return;
    }
    sendInstant(conversationId, text);
    Cable.sendMessage(meProfileId, conversationId, { message: text, type: 0 });
  }, [text, conversationId, meProfileId]);
}
