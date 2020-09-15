import { sendMessage } from '~/apis/api';
import { addQueuedMessage, removeQueuedMessage } from '~lib/QueryCache';

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

  retryHandler = (recurse = true) => {
    if (this.resendQueue.length === 0) {
      if (recurse) {
        setTimeout(this.retryHandler, this.resendInterval);
      }
      return;
    }

    const { meProfileId, conversationId, message } = this.resendQueue.pop();

    if (message.awaitingUpload) {
      this.resendQueue.push({ meProfileId, conversationId, message });
      if (recurse) {
        setTimeout(this.retryHandler, this.resendInterval);
      }
      return;
    }

    this._sendMessage(meProfileId, conversationId, message)
      .then(() => {
        // removeQueuedMessage(conversationId, message.qid);

        if (!recurse) {
          return;
        }

        this.resendInterval = 50;
        setTimeout(this.retryHandler, this.resendInterval);
      })
      .catch((e) => {
        console.log('sending message failed', e);
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
    });
  };

  updateQueuedMessage = (qid, updates) => {
    this.resendQueue = this.resendQueue.map((queueItem) => {
      return queueItem.message.qid === qid
        ? {
            ...queueItem,
            message: {
              ...queueItem.message,
              ...updates,
            },
          }
        : queueItem;
    });
  };

  sendMessage = (meProfileId, conversationId, _message) => {
    const message = {
      qid: Math.random(),
      ..._message,
      profile_id: meProfileId,
    };
    addQueuedMessage(conversationId, message);
    this.resendQueue.unshift({ meProfileId, conversationId, message });
    this.retryHandler(false);

    return message;
  };
}

const queue = new MessageQueue();
queue.init();

export default queue;
