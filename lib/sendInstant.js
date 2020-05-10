import Cable from '~/lib/Cable';
import { throttle } from 'lodash';

const sendInstant = throttle((conversationId, message) => {
  Cable.sendInstant(conversationId, message);
}, 50);

export default sendInstant;
