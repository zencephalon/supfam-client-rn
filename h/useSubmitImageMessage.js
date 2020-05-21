import React from 'react';

import MessageQueue from '~/lib/MessageQueue';
import UploadQueue from '~/lib/UploadQueue';

export default function useSubmitImageMessage(conversationId, meProfileId) {
  return React.useCallback(
    (image) => {
      if (!image) {
        return;
      }
      UploadQueue.addImageUpload(meProfileId, conversationId, {
        image,
        type: 1,
      });
    },
    [conversationId, meProfileId]
  );
}
