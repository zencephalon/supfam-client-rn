import { queryCache } from 'react-query';
import store from '~/store/store';
import { CACHE } from '~/apis/messageCache/actions';

export function refetchConversationMemberships() {
  queryCache.invalidateQueries('conversationMemberships');
}

export function addReceivedMessage(conversationId, message) {
  console.log('received message', message);
  cacheMessage(message);
  queryCache.setQueryData(
    ['received_messages', { conversationId }],
    (messages) => {
      return [message, ...(messages || [])];
    }
  );
}

export function cacheMessage(message) {
  // queryCache.setQueryData(['message', message.id], message);
  store.dispatch(CACHE(message.id, message));
}

export function updateConversationPresence(event, profile_id, conversation_id) {
  queryCache.setQueryData(
    ['conversationPresence', conversation_id],
    (presence) => {
      if (event == 'heartbeat') {
        return {
          ...presence,
          [profile_id]: Date.now(),
        };
      }
      if (event == 'disconnect') {
        return {
          ...presence,
          [profile_id]: null,
        };
      }
    }
  );
}

export function updateMessageReactions(messageId, reactions) {
  queryCache.setQueryData(['messageReactions', messageId], () => {
    return reactions;
  });
}

export function updateConversation({ last_message, id }) {
  queryCache.setQueryData(['conversationMembership', id], (membership) => {
    return {
      ...membership,
      last_message,
    };
  });
  queryCache.setQueryData('groupConversations', (conversations) => {
    return conversations?.map((conversation) =>
      id === conversation.id
        ? { ...conversation, updated_at: new Date().toISOString() }
        : conversation
    );
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
  cacheMessage(message);
  queryCache.setQueryData(['instantMessages', conversationId], (messages) => {
    const updated = {
      ...messages,
      [message.id]: {
        ...message,
        receivedAt: new Date(),
      },
    };
    return updated;
  });
}

export function removeInstantMessage(conversationId, id) {
  queryCache.setQueryData(['instantMessages', conversationId], (messages) => {
    const _messages = { ...messages };
    delete _messages[id];
    return _messages;
  });
}

export function updateStatus(profile_id, status) {
  queryCache.setQueryData(['friend', profile_id], (friend) => ({
    ...friend,
    status,
    updated_at: new Date().toISOString(),
  }));
  queryCache.setQueryData(['friends'], (friends) => {
    return friends?.map((friend) =>
      profile_id === friend.id
        ? { ...friend, status, updated_at: new Date().toISOString() }
        : friend
    );
  });
}

export function updateSeen(friendId, _seen) {
  const seen = { updated_at: Date.now(), ..._seen };
  queryCache.setQueryData(['friend', friendId], (profile) => ({
    ...profile,
    seen,
    updated_at: new Date().toISOString(),
  }));
  queryCache.setQueryData('friends', (friends) => {
    return friends?.map((friend) =>
      friendId === friend.id
        ? { ...friend, seen, updated_at: new Date().toISOString() }
        : friend
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
