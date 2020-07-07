import * as t from './actionTypes';

export const SELECT = (conversationId) => ({
  type: t.SELECT,
  conversationId,
});
