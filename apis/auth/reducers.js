import * as t from './actionTypes';

export default function reducer(state = { token: undefined }, action) {
  switch (action.type) {
    case t.LOGIN:
      return {
        ...state,
        token: action.token,
      };
    case t.LOGOUT:
      return {
        ...state,
        token: undefined,
      };
    default:
      return state;
  }
}
