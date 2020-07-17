import { AsyncStorage } from 'react-native';

const storageKey = 'auth_token';

interface AuthResponse {
  token: string;
}

class AuthToken {
  data?: AuthResponse;

  constructor() {
    this.data = undefined;
  }

  init = async () => {
    this.data = JSON.parse((await AsyncStorage.getItem(storageKey)) || 'null');
  };

  get = () => {
    return this.data;
  };

  set = (data: AuthResponse) => {
    this.data = data;
    return AsyncStorage.setItem(storageKey, JSON.stringify(data));
  };

  remove = () => {
    AsyncStorage.removeItem(storageKey);
  };
}

const authToken = new AuthToken();

export default authToken;
