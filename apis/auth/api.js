import { API_URL } from '~/lib/constants';

export const postLogin = ({ name, password }) => {
  return fetch(`${API_URL}login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  }).then((res) => {
    return res.json();
  });
};

export const postRegister = ({ name, password, passwordConfirmation }) => {
  return fetch(`${API_URL}register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, passwordConfirmation }),
  }).then((res) => res.json());
};
