import * as React from 'react';

import ChatsTopBar from '~/c/ChatsTopBar';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import StatusCenter from '~/c/StatusCenter';
import ChatsList from '~/c/ChatsList';

export default function ChatsScreen() {
  return (
    <SfKeyboardAvoidingView>
      <ChatsTopBar title="Group Chats" />

      <ChatsList />

      <StatusCenter />
    </SfKeyboardAvoidingView>
  );
}

ChatsScreen.navigationOptions = {
  header: null,
};
