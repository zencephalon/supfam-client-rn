import Cable from '~/lib/Cable';
import { throttle } from 'lodash';

const sendInstant = throttle((conversationId, message, qid) => {
  Cable.sendInstant(conversationId, message, qid);
}, 50);

export default sendInstant;
