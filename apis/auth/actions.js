import * as t from './actionTypes';

export const LOGOUT = () => ({
  type: t.LOGOUT,
});

export const LOGIN = token => ({
  type: t.LOGIN,
  token,
});
