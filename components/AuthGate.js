import * as React from 'react';
import AuthToken from '~/lib/AuthToken';
import {
  View,
  TextInput,
  Picker,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import SfTextInput from '~/components/SfTextInput';
import SfButton from '~/components/SfButton';
import SfText from '~/components/SfText';
import { API_URL } from '~/lib/constants';
import { debounce } from 'lodash';

const RegistrationForm = props => {
  return (
    <View>
      <SfText>Password:</SfText>
      <SfTextInput />
      <SfText>Password confirmation:</SfText>
      <SfTextInput />
      <SfButton title="Register" />
    </View>
  );
};

const LoginForm = props => {
  return (
    <View>
      <SfText>Password:</SfText>
      <SfTextInput />
      <SfButton title="Login" />
    </View>
  );
};

class AuthGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstChecked: false,
      fetchingNameAvailable: false,
      nameAvailable: undefined,
      token: AuthToken.get(),
      username: '',
    };
  }

  fetchNameAvailable = debounce(username => {
    this.setState({ fetchingNameAvailable: true });
    fetch(`${API_URL}available/${username}`)
      .then(resp => resp.json())
      .then(available => {
        console.log(available, 'hello');
        this.setState({
          nameAvailable: available,
          fetchingNameAvailable: false,
          firstChecked: true,
        });
      });
  }, 300);

  handleUsername = username => {
    this.setState({ username });
    this.fetchNameAvailable(username);
  };

  render() {
    const {
      token,
      username,
      fetchingNameAvailable,
      nameAvailable,
      firstChecked,
    } = this.state;

    return !token ? (
      <SafeAreaView>
        <SfText>Username:</SfText>
        <SfTextInput
          placeholder="User name"
          onChangeText={this.handleUsername}
          value={username}
        />
        {!firstChecked || fetchingNameAvailable ? (
          <SfText>{firstChecked ? 'Checking name...' : ''}</SfText>
        ) : nameAvailable ? (
          <RegistrationForm />
        ) : (
          <LoginForm />
        )}
      </SafeAreaView>
    ) : (
      this.props.children
    );
  }
}

export default AuthGate;
