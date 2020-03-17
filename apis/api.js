import { configureAPI } from 'redux-rest-reducer';
import { API_URL } from '~/lib/constants';
import AuthToken from '~/lib/AuthToken';

const setAuthHeader = headers => {
  const token = AuthToken.get();
  return { ...headers, Authorization: `${token}` };
};

const api = configureAPI(API_URL, { headerFunc: setAuthHeader });

export const getFriends = () => {
  return api.fetchFromAPI('friends');
};

export const getStatusMe = () => {
  return api.fetchFromAPI('statuses/me');
};

export const putStatusMe = data => {
  return api.putToAPI('statuses/me', {
    body: JSON.stringify(data),
  });
};

export default api;
