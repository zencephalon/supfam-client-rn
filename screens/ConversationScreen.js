import * as React from 'react';

import { useQuery } from 'react-query';
import { getProfileDmConversation } from '~/apis/api';

import statusColors from '~/constants/statusColors';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';

import useCachedProfile from '~/h/useCachedProfile';
import useProfileId from '~/h/useProfileId';
import useMessages from '~/h/useMessages';
import useMarkConversationRead from '~/h/useMarkConversationRead';

import ProfileIcon from '~/c/ProfileIcon';
import SfText from '~/c/SfText';
import { View } from 'react-native';

export default function ConversationScreen({ navigation, route }) {
  const { profileId } = route.params;

  const meProfileId = useProfileId();

  const profile = useCachedProfile(profileId);

  navigation.setOptions({
    headerTitle: (props) => {
      return (
        <View style={{ flexDirection: 'row' }}>
          <ProfileIcon profileId={profileId} />
          <SfText style={{ fontSize: 16 }}>{profile?.name}</SfText>
        </View>
      );
    },
    headerStyle: {
      // backgroundColor: statusColors[profile?.status?.color || 0],
    },
  });

  const { data: conversation } = useQuery(
    ['dmWith', { profileId }],
    getProfileDmConversation
  );
  const conversationId = conversation?.id;

  const { fetchMore, canFetchMore, messages } = useMessages(
    conversationId,
    meProfileId
  );

  useMarkConversationRead(conversationId, messages[0]?.id);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={54}>
      <MessageList
        messages={messages}
        meProfileId={meProfileId}
        fetchMore={fetchMore}
        canFetchMore={canFetchMore}
      />
      <MessageInput conversationId={conversationId} />
    </SfKeyboardAvoidingView>
  );
}

ConversationScreen.navigationOptions = {
  header: null,
};
