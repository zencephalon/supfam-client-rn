import * as React from 'react';

import ConversationTopBar from '~/c/ConversationTopBar';
import MessagingInterface from '~/c/MessagingInterface';

import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useProfileDmConversation from '~/h/useProfileDmConversation';

const placeholderText =
  'No messages have been sent yet. Start the conversation!';

export default function ConversationScreen({ navigation, route }) {
  const { profileId } = route.params;

  const meProfileId = useProfileId();

  const profile = useCachedProfile(profileId);

  const { conversation } = useProfileDmConversation(profileId);
  const conversationId = conversation?.id;

  return (
    <MessagingInterface
      conversationId={conversationId}
      emptyPlaceholderText={placeholderText}
      TopBar={
        <ConversationTopBar
          profileId={profileId}
          name={profile?.name}
          statusMessage={profile?.status?.message}
        />
      }
    />
  );
}

ConversationScreen.navigationOptions = {
  header: null,
};
