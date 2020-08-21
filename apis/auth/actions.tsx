import * as t from './actionTypes';

export const LOGOUT = () => ({
	type: t.LOGOUT,
});

export const LOGIN = ({ token, user = null }) => ({
	type: t.LOGIN,
	token,
	user,
});
