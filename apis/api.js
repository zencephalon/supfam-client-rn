import { configureAPI } from 'redux-rest-reducer';
import { API_URL } from '~/lib/constants';
import AuthToken from '~/lib/AuthToken';
import Cable from '~/lib/Cable';

const setAuthHeader = headers => {
  const { token } = AuthToken.get();
  return { ...headers, Authorization: `${token}` };
};

const api = configureAPI(API_URL, { headerFunc: setAuthHeader });

export const getFriends = () => {
  return api.fetchFromAPI('friends');
};

export const getStatusMe = () => {
  return api.fetchFromAPI('statuses/me');
};

export const getUserDmMessages = (key, { userId }) => {
  return api.fetchFromAPI(`messages/user/${userId}`);
};

export const sendUserDmMessage = ({ userId, data }) => {
  return api.postToAPI(`messages/user/${userId}`, {
    body: JSON.stringify(data),
  });
};

export const putStatusMe = data => {
  return Cable.updateStatus(data);
  // return api.putToAPI('statuses/me', {
  //   body: JSON.stringify(data),
  // });
};

export default api;
