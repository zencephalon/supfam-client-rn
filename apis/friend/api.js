import api from '~/apis/api';
import { NAME } from './constants';
import { API_URL } from '~/lib/constants';

const indexParam = undefined;

const template = {};

export const { POST, GET, DELETE, PUT, INDEX } = api.genericApiFactory(
  NAME,
  indexParam,
  template
);

export const getFriends = () => {
  // return fetch(`${API_URL}friends`).then(resp => resp.json());
  return api.fetchFromAPI('friends');
};
