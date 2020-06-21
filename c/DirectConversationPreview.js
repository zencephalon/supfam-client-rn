import * as React from 'react';

import useProfileMe from '~/h/useProfileMe';
import useCachedDmMembership from '~/h/useCachedDmMembership';
import useLight from '~/h/useLight';

import SfText from '~/c/SfText';

function MessagePreview({ message }) {
  const { backgrounds } = useLight();
  // TODO: handle non-text messages
  return (
    <SfText
      style={{
        fontSize: 16,
        backgroundColor: backgrounds[1],
        borderRadius: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 8,
        paddingLeft: 8,
        marginTop: 8,
        marginLeft: 8,
        // apparently necessary for borderRadius to work
        overflow: 'hidden',
      }}
      numberOfLines={1}
    >
      {message?.message}
    </SfText>
  );
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
  if (!last_message_id || last_message_id === last_read_message_id) {
    return null;
  }

  return <MessagePreview message={dmMembership?.last_message} />;
}
