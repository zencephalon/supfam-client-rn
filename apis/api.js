import { configureAPI } from 'redux-rest-reducer';
import { API_URL } from '~/lib/constants';
import AuthToken from '~/lib/AuthToken';

// const apiMap = {
//   stage: 'http://api.iluvu.ninja/',
//   dev: 'http://localhost:8000/',
//   prod: 'https://zw-api.zencephalon.com/',
// }

// export const API_BASE = apiMap[ZWIKI_ENV]

const setAuthHeader = headers => {
  const token = AuthToken.get();
  console.log({ token });
  return { ...headers, Authorization: `${token}` };
};

const api = configureAPI(API_URL, { headerFunc: setAuthHeader });

export default api;
