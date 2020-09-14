import { queryCache } from 'react-query';
import store from '~/store/store';
import { CACHE as CACHE_MESSAGE } from '~/apis/messageCache/actions';
import { RECEIVE, REMOVE } from '~/apis/instantMessages/actions';
import { RECEIVE_MESSAGES } from '~/apis/conversation/actions';

export function updateCachedProfile(profileId, profileUpdater) {
  queryCache.setQueryData(['friend', profileId], profileUpdater);
}

export function refetchConversationMemberships() {
  queryCache.invalidateQueries('conversationMemberships');
}

export function addReceivedMessage(conversationId, message) {
  cacheMessage(message);
  store.dispatch(RECEIVE_MESSAGES(conversationId, [message]));
}

export function clearReceivedMessages(conversationId) {
  queryCache.setQueryData(['received_messages', { conversationId }], () => {
    return [];
  });
}

export function cacheMessage(message) {
  store.dispatch(CACHE_MESSAGE(message.id, message));
}

export function removeMessage(messageId) {
  store.dispatch(CACHE_MESSAGE(messageId, null));
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
  const _message = {
    ...message,
    receivedAt: new Date(),
  };
  cacheMessage(_message);
  store.dispatch(RECEIVE(conversationId, _message));
}

export function removeInstantMessage(conversationId, id) {
  removeMessage(id);
  // store.dispatch(REMOVE(conversationId, id));
}

export function updateStatus(profile_id, status) {
  updateCachedProfile(profile_id, (friend) => ({
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
  const seen = { ..._seen, updated_at: Date.now() };
  updateCachedProfile(friendId, (profile) => ({
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
  const tmpId = `queued${message.qid}`;
  const _message = { ...message, queued: true, id: tmpId };
  cacheMessage(_message);

  queryCache.setQueryData(
    ['queued_messages', { conversationId }],
    (_messages) => {
      const messages = _messages || [];
      return [_message, ...messages];
    }
  );
}

export function removeQueuedMessage(conversationId, qid) {
  queryCache.setQueryData(
    ['queued_messages', { conversationId }],
    (messages) => {
      return (messages || []).filter((message) => message.qid !== qid);
    }
  );
}

export function removeQueuedMessages(conversationId, qids) {
  queryCache.setQueryData(
    ['queued_messages', { conversationId }],
    (messages) => {
      return (messages || []).filter((message) => !qids.includes(message.qid));
    }
  );
}
