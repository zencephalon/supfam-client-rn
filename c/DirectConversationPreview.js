import * as React from 'react';
import SfText from '~/c/SfText';

import useProfileMe from '~/h/useProfileMe';
import useCachedDmMembership from '~/h/useCachedDmMembership';

function MessagePreview({ message }) {
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

  const last_message_id = dmMembership?.last_message?.id;
  const last_read_message_id = dmMembership?.last_read_message_id;
  if (
    !last_message_id ||
    !last_read_message_id ||
    last_message_id === last_read_message_id
  ) {
    return null;
  }

  return <MessagePreview message={dmMembership?.last_message} />;
}
