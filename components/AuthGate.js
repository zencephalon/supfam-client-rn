import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { API_URL } from '~/lib/constants';

import { LOGIN } from '~/apis/auth/actions';
import AuthToken from '~/lib/AuthToken';

import SfTextInput from '~/components/SfTextInput';
import SfText from '~/components/SfText';
import RegistrationForm from '~/components/RegistrationForm';
import LoginForm from '~/components/LoginForm';

const fetchNameAvailable = name => {
  return fetch(`${API_URL}available/${name}`).then(resp => resp.json());
};

const postLogin = ({ name, password }) => {
  return fetch(`${API_URL}login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  }).then(res => {
    return res.json();
  });
};

const postRegister = ({ name, password, passwordConfirmation }) => {
  return fetch(`${API_URL}register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, passwordConfirmation }),
  }).then(res => res.json());
};

class AuthGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstChecked: false,
      fetchingNameAvailable: false,
      nameAvailable: undefined,
      name: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  fetchNameAvailable = debounce(name => {
    this.setState({ fetchingNameAvailable: true });
    getNameAvailable(name).then(available => {
      this.setState({
        nameAvailable: available,
        fetchingNameAvailable: false,
        firstChecked: true,
      });
    });
  }, 300);

  handleUsername = name => {
    this.setState({ name });
    this.fetchNameAvailable(name);
  };

  setPassword = password => {
    this.setState({ password });
  };

  setPasswordConfirmation = passwordConfirmation => {
    this.setState({ passwordConfirmation });
  };

  login = () => {
    const { name, password } = this.state;
    this.setState({ loggingIn: true });

    postLogin({ name, password }).then(json => {
      AuthToken.set(json.token);
      this.props.dispatch(LOGIN(json.token));
    });
  };

  register = () => {
    const { name, password, passwordConfirmation } = this.state;
    if (password !== passwordConfirmation) {
      // actually do something here to indicate the problem
      // or just prevent this from even happening
      return;
    }
    this.setState({ loggingIn: true });

    postRegister({ name, password, passwordConfirmation }).then(({ id }) => {
      if (id) {
        this.login();
      }
    });
  };

  render() {
    const {
      name,
      fetchingNameAvailable,
      nameAvailable,
      firstChecked,
      password,
      passwordConfirmation,
    } = this.state;
    const { token } = this.props;

    return !token ? (
      <SafeAreaView>
        <SfText>Welcome to Supfam</SfText>
        <SfTextInput
          placeholder="User name"
          onChangeText={this.handleUsername}
          value={name}
          autoCapitalize="none"
          textContentType="username"
        />
        {!firstChecked || fetchingNameAvailable ? (
          <SfText>{firstChecked ? 'Checking name...' : ''}</SfText>
        ) : nameAvailable ? (
          <RegistrationForm
            password={password}
            passwordConfirmation={passwordConfirmation}
            setPassword={this.setPassword}
            setPasswordConfirmation={this.setPasswordConfirmation}
            register={this.register}
          />
        ) : (
          <LoginForm
            setPassword={this.setPassword}
            login={this.login}
            password={password}
          />
        )}
      </SafeAreaView>
    ) : (
      this.props.children
    );
  }
}

function mapStateToProps(state) {
  const { token } = state.auth;

  return { token };
}

export default connect(mapStateToProps)(AuthGate);
