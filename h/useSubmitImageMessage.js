import React from 'react';

import MessageQueue from '~/lib/MessageQueue';

export default function useSubmitImageMessage(conversationId, meProfileId) {
  return React.useCallback(
    (image) => {
      if (!image) {
        return;
      }
      MessageQueue.addImageUpload(meProfileId, conversationId, {
        image,
        type: 1,
      });
    },
    [conversationId, meProfileId]
  );
}
