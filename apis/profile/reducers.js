import * as t from './actionTypes';

export default function reducer(state = { token: undefined }, action) {
  switch (action.type) {
    case t.SELECT:
      return {
        ...state,
        profileId: action.profileId,
      };
    default:
      return state;
  }
}
