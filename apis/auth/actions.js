import * as t from './actionTypes';

export const LOGOUT = () => ({
  type: t.LOGOUT,
});

export const LOGIN = ({ token, user }) => ({
  type: t.LOGIN,
  token,
  user,
});
