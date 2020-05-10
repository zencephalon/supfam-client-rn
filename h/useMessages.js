import { useInfiniteQuery } from 'react-query';
import { getConversationMessages } from '~/apis/api';
import { flatten } from 'lodash';

export default function useMessages(conversationId) {
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

  const messages = flatten(message_groups.map((group) => group.messages));

  return {
    messages,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  };
}
