import * as React from 'react';
import SfText from '~/c/SfText';

import useProfileMe from '~/h/useProfileMe';
import useCachedDmMembership from '~/h/useCachedDmMembership';

export default function DirectConversationPreview({ userId }) {
  const { profile } = useProfileMe();
  const meId = profile?.user_id;
  console.log({ meId, userId });
  const dmId = [meId, userId].sort().join(':');

  const dmMembership = useCachedDmMembership(dmId);

  if (!dmMembership) {
    return null;
  }

  if (
    dmMembership.last_read_message_id ===
    dmMembership.conversation.last_message_id
  ) {
    return null;
  }

  console.log({ dmMembership });
  return <SfText>Unread message!</SfText>;
}
