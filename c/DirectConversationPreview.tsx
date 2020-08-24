import * as React from 'react';

import useProfileMe from '~/h/useProfileMe';
import useCachedDmMembership from '~/h/useCachedDmMembership';
import useCachedProfile from '~/h/useCachedProfile';

import MessagePreview from '~/c/MessagePreview';

export default function DirectConversationPreview({
  profileId,
}: {
  profileId: number;
}): React.ReactElement | null {
  const theirProfile = useCachedProfile(profileId);
  const { profile } = useProfileMe();
  const meId = profile?.user_id;
  const dmId = [meId, theirProfile?.user_id].sort((a, b) => a - b).join(':');

  const dmMembership = useCachedDmMembership(dmId);

  if (!dmMembership) {
    return null;
  }

  const last_message = dmMembership?.last_message;
  const last_message_id = last_message?.id;
  const last_read_message_id = dmMembership?.last_read_message_id;
  const read = last_read_message_id >= last_message_id
  if (!last_message_id || read) {
    return null;
  }

  return <MessagePreview messageText={last_message?.message} messageType={last_message?.type} read={read} />;
}
