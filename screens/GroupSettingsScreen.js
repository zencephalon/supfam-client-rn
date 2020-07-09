import React from 'react';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupMemberList from '~/c/GroupMemberList';
import GroupNameForm from '~/c/GroupNameForm';
import SfTextButton from '~/c/SfTextButton';
import SfText from '~/c/SfText';

export default function GroupSettingsScreen({ navigation, route }) {
  const { conversationId } = route.params;

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={96}>
      <GroupNameForm conversationId={conversationId} />
      <SfText style={{
        fontSize: 16,
        paddingLeft: 8,
        marginTop: 32,
        marginBottom: 16,
      }}>
        Members:
      </SfText>
      <GroupMemberList conversationId={conversationId} />
      <SfTextButton
        title="Add members..."
        onPress={() =>
          navigation.navigate('Add Members', {
            conversationId,
          })
        }
      />
    </SfKeyboardAvoidingView>
  );
}
