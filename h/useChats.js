import { useQuery, queryCache } from 'react-query';
import { getConversationsMe } from '~/apis/api';

import useProfileId from '~/h/useProfileId';

export default function useChats() {
  const profileId = useProfileId();
  const { status, data, error } = useQuery(
    profileId && ['chats', profileId],
    getConversationsMe,
    {
      onSuccess: (conversations) => {
        conversations.map((conversation) => {
          console.log({ conversation });
          queryCache.setQueryData(
            ['conversation', conversation.id],
            conversation
          );
        });
      },
    }
  );
  // const friends = orderBy(
  //   data,
  //   ['status.color', 'updated_at'],
  //   ['desc', 'desc']
  // );

  return { status, chats: data, error };
}
