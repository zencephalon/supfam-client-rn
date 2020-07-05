import React from 'react';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import GroupMemberList from '~/c/GroupMemberList';
import GroupNameForm from '~/c/GroupNameForm';
import SfTextButton from '~/c/SfTextButton';

export default function GroupBuilderScreen({navigation, route}) {
  const { conversation } = route.params;

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={96}>
      <GroupMemberList conversation={conversation} />
      <SfTextButton
        en
        round
        title='Add members...'
        onPress={() => navigation.navigate('Add Members to Group', {
          conversation: conversation,
        })}
        style={{
          marginTop: 16,
        }}
      />
      <GroupNameForm conversation={conversation} />
    </SfKeyboardAvoidingView>
  );
}
