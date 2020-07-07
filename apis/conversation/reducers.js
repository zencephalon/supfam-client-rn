import * as t from './actionTypes';

export default function reducer(state = { conversationId: undefined }, action) {
  switch (action.type) {
    case t.SELECT:
      return {
        ...state,
        conversationId: action.conversationId,
      };
    default:
      return state;
  }
}
