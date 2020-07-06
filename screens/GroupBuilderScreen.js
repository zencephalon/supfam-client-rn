import React from 'react';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupBuilderFriendList from '~/c/GroupBuilderFriendList';

export default function GroupBuilderScreen({ navigation, route }) {
  const { conversationId } = route.params;

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={96}>
      <GroupBuilderFriendList
        navigation={navigation}
        conversationId={conversationId}
      />
    </SfKeyboardAvoidingView>
  );
}
