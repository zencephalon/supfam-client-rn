import * as React from 'react';

import useCachedConversationMembership from '~/h/useCachedConversationMembership';

import MessagePreview from '~/c/MessagePreview';

export default function GroupConversationPreview({ conversationId }) {
  const membership = useCachedConversationMembership(conversationId);

  if (!membership) {
    return null;
  }

  const last_message_id = membership?.last_message?.id;
  if (!last_message_id) {
    return null;
  }

  return <MessagePreview message={membership?.last_message} />;
}
