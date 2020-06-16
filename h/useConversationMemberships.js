import { useQuery, queryCache } from 'react-query';
import { getConversationsMemberships } from '~/apis/api';

import useProfileId from '~/h/useProfileId';

export default function useConversationMemberships() {
  const profileId = useProfileId();
  const { status, data, error } = useQuery(
    profileId && ['chats', profileId],
    getConversationsMemberships,
    {
      onSuccess: (memberships) => {
        memberships.map((membership) => {
          console.log({ membership });
          queryCache.setQueryData(
            ['dmMembership', membership.conversation?.dmId],
            membership
          );
          // queryCache.setQueryData(
          //   ['conversation', conversation.id],
          //   conversation
          // );
        });
      },
    }
  );

  return { status, conversationMemberships: data, error };
}
