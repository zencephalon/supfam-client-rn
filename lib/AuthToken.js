import { AsyncStorage } from 'react-native';

const storageKey = 'auth_token';

class AuthToken {
  data;

  init = async () => {
    this.data = await AsyncStorage.getItem(storageKey);
  };

  get = () => {
    return this.data;
  };

  set = token => {
    this.data = token;
    return AsyncStorage.setItem(storageKey, token);
  };

  remove = () => {
    AsyncStorage.removeItem(storageKey);
  };
}

const authToken = new AuthToken();

export default authToken;
