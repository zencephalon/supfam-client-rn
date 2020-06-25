import { queryCache } from 'react-query';

export function refetchConversationMemberships() {
  queryCache.invalidateQueries('conversationMemberships');
}

export function addReceivedMessage(conversationId, message) {
  queryCache.setQueryData(
    ['received_messages', { conversationId }],
    (messages) => {
      return [message, ...(messages || [])];
    }
  );
}

export function updateConversation({ last_message, id }) {
  queryCache.setQueryData(['conversationMembership', id], (membership) => {
    return {
      ...membership,
      last_message,
    };
  });
}

export function markConversationRead(conversationId, messageId) {
  queryCache.setQueryData(
    ['conversationMembership', conversationId],
    (membership) => {
      return {
        ...membership,
        last_read_message_id: messageId,
      };
    }
  );
}

export function updateInstantMessages(conversationId, message) {
  queryCache.setQueryData(
    ['instant_messages', conversationId],
    message
      ? {
          ...message,
          receivedAt: new Date(),
        }
      : null
  );
}

export function updateStatus(profile_id, status) {
  queryCache.setQueryData(['friend', profile_id], (friend) => ({
    ...friend,
    status,
  }));
  queryCache.setQueryData(['friends'], (friends) => {
    return friends?.map((friend) =>
      profile_id === friend.id ? { ...friend, status } : friend
    );
  });
}

export function updateSeen(friendId, _seen) {
  const seen = { updated_at: Date.now(), ..._seen };
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

export function updateStatusOrSeen(data) {
  // Note, for the moment we'll only get a profile_id with a seen update
  const { status, seen, profile_id } = data;
  if (status) {
    updateStatus(profile_id, status);
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
