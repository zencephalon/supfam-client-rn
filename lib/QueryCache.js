import { queryCache } from 'react-query';

export function refetchConversationMemberships() {
  queryCache.refetchQueries('conversationMemberships');
}

export function addReceivedMessage(conversationId, message) {
  queryCache.setQueryData(
    ['received_messages', { conversationId }],
    (messages) => {
      return [message, ...(messages || [])];
    }
  );
}

export function updateInstantMessages(conversationId, message) {
  queryCache.setQueryData(
    ['instant_messages', { conversationId }],
    message
      ? {
          ...message,
          receivedAt: new Date(),
        }
      : null
  );
}

export function updateProfiles(profile) {
  queryCache.setQueryData(['friend', profile.id], profile);
  queryCache.setQueryData('friends', (friends) => {
    return friends?.map((friend) =>
      profile.id === friend.id ? profile : friend
    );
  });
}

export function updateSeen(friendId, seen) {
  queryCache.setQueryData(['friend', friendId], (profile) => ({
    ...profile,
    seen,
  }));
  queryCache.setQueryData('friends', (friends) => {
    return friends?.map((friend) =>
      friendId === friend.id ? { ...friend, seen } : friend
    );
  });
}

export function updateProfileOrSeen(data) {
  // Note, for the moment we'll only get a profile_id with a seen update
  const { profile, seen, profile_id } = data;
  if (profile) {
    updateProfiles(profile);
  }
  if (seen) {
    updateSeen(profile_id, seen);
  }
}

export function addQueuedMessage(conversationId, message) {
  queryCache.setQueryData(
    ['queued_messages', { conversationId }],
    (_messages) => {
      const messages = _messages || [];
      return [
        { ...message, queued: true, id: `queued${messages.length}` },
        ...messages,
      ];
    }
  );
}

export function removeQueuedMessage(conversationId) {
  queryCache.setQueryData(
    ['queued_messages', { conversationId }],
    (_messages) => {
      const messages = [...(_messages || [])];
      messages.pop();
      return messages;
    }
  );
}
