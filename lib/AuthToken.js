import { AsyncStorage } from 'react-native';

class AuthToken {
  data;

  init = async () => {
    this.data = await AsyncStorage.getItem('auth_token');
  };

  get = () => {
    return this.data;
  };

  set = token => {
    this.data = token;
    return AsyncStorage.setItem('auth_token', token);
  };
}

const authToken = new AuthToken();

export default authToken;
