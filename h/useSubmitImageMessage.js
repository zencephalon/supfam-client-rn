import React from 'react';

import MessageQueue from '~/lib/MessageQueue';

export default function useSubmitImageMessage(conversationId, meProfileId) {
  return React.useCallback(
    (url) => {
      if (!url) {
        return;
      }
      MessageQueue.addImageUpload(meProfileId, conversationId, {
        filepath: url,
        type: 1,
      });
    },
    [conversationId, meProfileId]
  );
}
