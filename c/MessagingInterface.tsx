import * as React from 'react';

import MessageList from '~/c/MessageList';
import MessageInput from '~/c/MessageInput';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import EmptyListPlaceholder from '~/c/EmptyListPlaceholder';

import useProfileId from '~/h/useProfileId';
import useMarkConversationRead from '~/h/useMarkConversationRead';
import useConversationSelect from '~/h/useConversationSelect';
import useConversation from '~/h/useConversation';

type Props = {
  conversationId: number;
  TopBar: React.ReactElement;
  emptyPlaceholderText: string;
};

const MessagingInterface: React.FunctionComponent<Props> = ({
  conversationId,
  TopBar,
  emptyPlaceholderText,
}) => {
  const meProfileId = useProfileId();

  const { messages, fetchMore, canFetchMore, loading } = useConversation(
    conversationId,
    meProfileId
  );
  useConversationSelect(conversationId);

  useMarkConversationRead(conversationId, messages[0]?.id);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={-4}>
      {TopBar}
      {!loading && messages.length == 0 && (
        <EmptyListPlaceholder text={emptyPlaceholderText} />
      )}
      <MessageList
        messages={messages}
        meProfileId={meProfileId}
        fetchMore={fetchMore}
        canFetchMore={canFetchMore}
        loading={loading}
      />
      <MessageInput conversationId={conversationId} />
    </SfKeyboardAvoidingView>
  );
};

export default MessagingInterface;
