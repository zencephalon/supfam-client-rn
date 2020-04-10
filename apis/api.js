import { configureAPI } from 'redux-rest-reducer';
import { API_URL } from '~/lib/constants';
import AuthToken from '~/lib/AuthToken';

const setAuthHeader = (headers) => {
  const token = AuthToken.get()?.token;
  return { ...headers, Authorization: `${token}` };
};

const api = configureAPI(API_URL, { headerFunc: setAuthHeader });

export const getFriends = () => {
  return api.fetchFromAPI('friends');
};

export const getStatusMe = () => {
  return api.fetchFromAPI('users/me');
};

export const getUserDmMessages = (key, { userId }) => {
  return api.fetchFromAPI(`messages/user/${userId}`);
};

export const sendUserDmMessage = ({ userId, data }) => {
  return api.postToAPI(`messages/user/${userId}`, {
    body: JSON.stringify(data),
  });
};

export const putStatusMe = (data) => {
  return api.putToAPI('statuses/me', {
    body: JSON.stringify(data),
  });
};

export const postVerify = ({ phone }) => {
  return api.postToAPI(`verify`, {
    body: JSON.stringify({ phone }),
  });
};

export const postVerify2 = ({ phone }) => {
  return fetch(`${API_URL}verify`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone }),
  }).then((res) => res.json());
};

export default api;
