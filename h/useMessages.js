import * as React from 'react';

import { useInfiniteQuery, useQuery } from 'react-query';
import { flatten, tail, head, uniqBy } from 'lodash';

import { getConversationMessages } from '~/apis/api';
import Cable from '~/lib/Cable';
import MessageQueue from '~/lib/MessageQueue';

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
    ['dm_messages', { conversationId }],
    getConversationMessages,
    {
      getFetchMore: (lastGroup) => {
        return lastGroup.next_cursor;
      },
      enabled: conversationId,
    }
  );

  const { data: queuedMessages } = useQuery(
    ['queued_messages', { conversationId }],
    () => {},
    {
      manual: true,
      initialData: MessageQueue.getQueued(conversationId),
      enabled: conversationId,
    }
  );
  const { data: receivedMessages } = useQuery(
    ['received_messages', { conversationId }],
    () => {},
    {
      manual: true,
      initialData: [],
      enabled: conversationId,
    }
  );
  const { data: instantMessage } = useQuery(
    ['instant_messages', { conversationId }],
    () => {},
    {
      manual: true,
      initialData: [],
      enabled: conversationId,
    }
  );

  let _receivedMessages = uniqBy(
    (queuedMessages || []).concat(receivedMessages || []),
    'qid'
  );

  let messages = uniqBy(
    _receivedMessages.concat(head(message_groups)?.messages || []),
    'id'
  );
  messages = messages.concat(
    flatten(tail(message_groups).map((group) => group.messages))
  );

  if (instantMessage?.message && instantMessage?.profile_id !== meProfileId) {
    messages.unshift(instantMessage);
  }

  return {
    messages,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  };
}
