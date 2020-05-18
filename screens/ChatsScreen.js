import * as React from 'react';

import HomeTopBar from '~/c/HomeTopBar';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import StatusCenter from '~/c/StatusCenter';

export default function ChatsScreen() {
  return (
    <SfKeyboardAvoidingView>
      <HomeTopBar title="Chats" />

      {/* <ChatsList /> */}

      <StatusCenter />
    </SfKeyboardAvoidingView>
  );
}

ChatsScreen.navigationOptions = {
  header: null,
};
