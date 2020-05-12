import * as React from 'react';

import { useInfiniteQuery, useQuery } from 'react-query';
import { flatten, tail, head, uniqBy } from 'lodash';

import { getConversationMessages } from '~/apis/api';
import Cable from '~/lib/Cable';

export default function useMessages(conversationId, meProfileId) {
  React.useEffect(() => {
    Cable.subscribeConversation(conversationId, meProfileId);
    return () => {
      Cable.unsubscribeConversation(conversationId);
    };
  }, [conversationId]);

  const {
    data: message_groups,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    conversationId && ['dm_messages', { conversationId }],
    getConversationMessages,
    {
      getFetchMore: (lastGroup) => {
        return lastGroup.next_cursor;
      },
    }
  );

  const { data: instantMessage } = useQuery(
    conversationId && ['instant_messages', { conversationId }],
    () => {}
  );
  const { data: queuedMessages } = useQuery(
    conversationId && ['queued_messages', { conversationId }],
    () => {},
    {
      manual: true,
      initialData: Cable.getQueued(conversationId),
    }
  );
  const { data: receivedMessages } = useQuery(
    conversationId && ['received_messages', { conversationId }],
    () => {}
  );

  let messages = uniqBy([
    ...(receivedMessages || []),
    ...(head(message_groups)?.messages || []),
  ]);
  messages = [
    ...messages,
    ...flatten(tail(message_groups).map((group) => group.messages)),
  ];

  if (queuedMessages) {
    messages = [...queuedMessages, ...messages];
  }
  if (instantMessage?.message && instantMessage?.profile_id !== meProfileId) {
    messages = [instantMessage, ...messages];
  }

  return {
    messages,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  };
}
