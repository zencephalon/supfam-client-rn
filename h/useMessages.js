import * as React from 'react';

import { useInfiniteQuery, useQuery } from 'react-query';
import { flatten, tail, head, uniqBy, values } from 'lodash';

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
  const { data: instantMessages } = useQuery(
    ['instantMessages', conversationId],
    () => {},
    {
      manual: true,
      enabled: conversationId,
      initialData: {},
    }
  );

  let messages = values(instantMessages).filter(
    (msg) => msg.profile_id !== meProfileId
  );

  messages = messages.concat(queuedMessages || []);

  messages = uniqBy(messages.concat(receivedMessages || []), 'qid');

  messages = uniqBy(
    messages.concat(head(message_groups)?.messages || []),
    'id'
  );
  messages = messages.concat(
    flatten(tail(message_groups).map((group) => group.messages))
  );

  return {
    messages,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  };
}
