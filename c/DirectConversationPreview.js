import * as React from 'react';
import SfText from '~/c/SfText';

import useProfileMe from '~/h/useProfileMe';
import useCachedDmMembership from '~/h/useCachedDmMembership';
import useConversationPreview from '~/h/useConversationPreview';

function MessagePreview({ conversationId, message }) {
  // const { message } = useConversationPreview(conversationId);
  console.log({ message }, 'wtf');

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

  const last_message_id = dmMembership?.last_message?.id;
  const last_read_message_id = dmMembership?.last_read_message_id;
  if (
    !last_message_id ||
    !last_read_message_id ||
    last_message_id === last_read_message_id
  ) {
    return null;
  }

  return (
    <MessagePreview
      message={dmMembership?.last_message}
      conversationId={dmMembership.conversation_id}
    />
  );
}
