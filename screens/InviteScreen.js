import React from 'react';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import FriendOfFriendList from '~/c/FriendOfFriendList';

export default function InviteScreen({navigation}) {
  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={96}>
      <FriendOfFriendList navigation={navigation} />
    </SfKeyboardAvoidingView>
  );
}
