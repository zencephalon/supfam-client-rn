import { queryCache } from 'react-query';

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
  const { profile, seen } = data;
  if (profile) {
    updateProfiles(profile);
  }
  if (seen) {
    updateSeen(friendId, seen);
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
