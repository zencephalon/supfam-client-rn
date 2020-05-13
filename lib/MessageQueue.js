import { sendMessage } from '~/apis/api';
import { queryCache } from 'react-query';

function addQueuedMessage(conversationId, message) {
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

function removeQueuedMessage(conversationId) {
  queryCache.setQueryData(
    ['queued_messages', { conversationId }],
    (_messages) => {
      const messages = [...(_messages || [])];
      messages.pop();
      return messages;
    }
  );
}

class MessageQueue {
  init = () => {
    this.resendInterval = 50;
    this.resendQueue = [];

    this.retryHandler(true);
  };

  getQueued = (conversationId) => {
    return this.resendQueue
      .filter((data) => data.conversationId === conversationId)
      .map(({ meProfileId, conversationId, message }, index) => ({
        ...message,
        queued: true,
        profile_id: meProfileId,
        id: `queued${index}`,
      }));
  };

  retryHandler = (recurse) => {
    if (this.resendQueue.length === 0) {
      setTimeout(this.retryHandler, this.resendInterval);
      return;
    }

    const { meProfileId, conversationId, message } = this.resendQueue.pop();

    this._sendMessage(meProfileId, conversationId, message)
      .then(() => {
        removeQueuedMessage(conversationId);

        if (!recurse) {
          return;
        }

        this.resendInterval = 50;
        setTimeout(this.retryHandler, this.resendInterval);
      })
      .catch((e) => {
        this.resendQueue.push({ meProfileId, conversationId, message });

        if (!recurse) {
          return;
        }

        if (this.resendInterval < 2000) {
          this.resendInterval = this.resendInterval * 2;
        }
        setTimeout(this.retryHandler, this.resendInterval);
      });
  };

  _sendMessage = (meProfileId, conversationId, message) => {
    return sendMessage({
      meProfileId,
      conversationId,
      data: { message },
    }).then((message) => {
      addReceivedMessage(conversationId, message);
    });
  };

  sendMessage = (meProfileId, conversationId, message) => {
    addQueuedMessage(conversationId, {
      ...message,
      profile_id: meProfileId,
    });
    this.resendQueue.unshift({ meProfileId, conversationId, message });
    this.retryHandler(false);
  };
}

const queue = new MessageQueue();
queue.init();

export default queue;
