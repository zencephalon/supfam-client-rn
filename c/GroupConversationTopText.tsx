import * as React from 'react';

import TopText from '~/c/TopText';

import useCachedConversation from '~/h/useCachedConversation';

import GroupMemberNameSummary from '~/c/GroupMemberNameSummary';

export default React.memo(function GroupConversationTopText({
  conversationId,
}: {
  conversationId: number;
}) {
  const conversation = useCachedConversation(conversationId);

  if (!conversation) {
    return null;
  }

  return (
    <TopText
      title={
        conversation.name || (
          <GroupMemberNameSummary conversationId={conversationId} />
        )
      }
    />
  );
});
