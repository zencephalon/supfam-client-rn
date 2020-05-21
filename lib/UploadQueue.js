import { uploadImage } from '~/apis/api';
import { addQueuedMessage, removeQueuedMessage } from '~lib/QueryCache';
import MessageQueue from '~/lib/MessageQueue';

class UploadQueue {
  init = () => {
    this.uploadInterval = 5000;
    this.uploadQueue = [];

    this.retryHandler(true);
  };

  retryHandler = (recurse) => {
    if (this.uploadQueue.length === 0) {
      if (recurse) {
        setTimeout(this.retryHandler, this.resendInterval);
      }
      return;
    }

    const { meProfileId, conversationId, message } = this.uploadQueue.pop();

    uploadImage(message.image.uri)
      .then(({ key }) => {
        // updateMessage in messageQueue
        MessageQueue.updateQueued(message.qid, {
          image: {
            ...message.image,
            uri: `https://supfam-avatar.s3.us-east-2.amazonaws.com/${key}`,
          },
          awaitingUpload: false,
        });

        if (!recurse) {
          return;
        }

        this.resendInterval = 50;
        setTimeout(this.retryHandler, this.resendInterval);
      })
      .catch((e) => {
        this.uploadQueue.push({ meProfileId, conversationId, message });

        if (!recurse) {
          return;
        }

        if (this.resendInterval < 20000) {
          this.resendInterval = this.resendInterval * 2;
        }
        setTimeout(this.retryHandler, this.resendInterval);
      });
  };

  addImageUpload = (meProfileId, conversationId, _message) => {
    const message = MessageQueue.sendMessage(meProfileId, conversationId, {
      ..._message,
      awaitingUpload: true,
    });
    this.uploadQueue.unshift({ meProfileId, conversationId, message });
    // this.retryHandler(false);
  };
}

const queue = new UploadQueue();
queue.init();

export default queue;
