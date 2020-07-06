import React from 'react';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupMemberList from '~/c/GroupMemberList';
import GroupNameForm from '~/c/GroupNameForm';
import SfTextButton from '~/c/SfTextButton';

export default function GroupSettingsScreen({ navigation, route }) {
  const { conversationId } = route.params;

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={96}>
      <GroupMemberList conversationId={conversationId} />
      <SfTextButton
        en
        round
        title="Add members..."
        onPress={() =>
          navigation.navigate('Add Members', {
            conversationId,
          })
        }
        style={{
          marginTop: 16,
        }}
      />
      <GroupNameForm conversationId={conversationId} />
    </SfKeyboardAvoidingView>
  );
}
