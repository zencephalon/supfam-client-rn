import React from 'react';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupBuilderFriendList from '~/c/GroupBuilderFriendList';

export default function GroupBuilderScreen({route}) {
  const { conversation } = route.params;
  console.log("conversation in group builder screen is", conversation);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={96}>
      <GroupBuilderFriendList conversation={conversation} />
    </SfKeyboardAvoidingView>
  );
}
