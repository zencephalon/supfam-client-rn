import * as React from 'react';
import SfText from '~/c/SfText';

import useProfileMe from '~/h/useProfileMe';
import useCachedDmMembership from '~/h/useCachedDmMembership';
import useConversationPreview from '~/h/useConversationPreview';

function MessagePreview({ conversationId }) {
  const { message } = useConversationPreview(conversationId);

  // TODO: handle non-text messages
  return <SfText>{message?.message}</SfText>;
}

export default function DirectConversationPreview({ userId }) {
  const { profile } = useProfileMe();
  const meId = profile?.user_id;
  const dmId = [meId, userId].sort().join(':');

  const dmMembership = useCachedDmMembership(dmId);

  if (!dmMembership) {
    return null;
  }

  console.log({ dmMembership });

  if (
    dmMembership.last_read_message_id ===
    dmMembership.conversation.last_message_id
  ) {
    return null;
  }

  return <MessagePreview conversationId={dmMembership?.conversation?.id} />;
}
