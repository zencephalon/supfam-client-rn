import * as React from 'react';
import { View } from 'react-native';

import useCachedConversationMembership from '~/h/useCachedConversationMembership';

import MessagePreview from '~/c/MessagePreview';
import ProfileIcon from '~/c/ProfileIcon';

export default function GroupConversationPreview({ conversationId }) {
  const membership = useCachedConversationMembership(conversationId);

  if (!membership) {
    return null;
  }

  const last_message_id = membership?.last_message?.id;
  const last_read_message_id = membership?.last_read_message_id;
  if (!last_message_id || last_message_id === last_read_message_id) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      <MessagePreview message={membership?.last_message} />
      <ProfileIcon profileId={membership?.last_message_profile_id} size={24} />
    </View>
  );
}
