import * as React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { LOGIN } from '~/apis/auth/actions';
import { getNameAvailable, postLogin, postRegister } from '~/apis/auth/api';
import AuthToken from '~/lib/AuthToken';

import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfContainer from '~/c/SfContainer';
import RegistrationForm from '~/c/RegistrationForm';
import LoginForm from '~/c/LoginForm';

import * as Colors from '~/constants/Colors';

class AuthGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingNameAvailable: false,
      nameAvailable: undefined,
      name: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  fetchNameAvailable = debounce(name => {
    if (name === '') {
      this.setState({ fetchingNameAvailable: false });
      return;
    }
    this.setState({ fetchingNameAvailable: true });
    getNameAvailable(name).then(available => {
      this.setState({
        nameAvailable: available,
        fetchingNameAvailable: false,
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
    if (!password) {
      return;
    }
    this.setState({ loggingIn: true });

    postLogin({ name, password }).then(json => {
      AuthToken.set(json);
      this.props.dispatch(LOGIN(json));
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
      password,
      passwordConfirmation,
    } = this.state;
    const { token } = this.props;

    const emptyName = name === '';

    if (token) {
      return this.props.children;
    }

    return (
      <SfContainer>
        <View style={styles.contentContainer}>
          <SfText style={styles.welcomeText}>Welcome to Supfam</SfText>
          <SfTextInput
            placeholder="User name"
            onChangeText={this.handleUsername}
            value={name}
            autoCapitalize="none"
            textContentType="username"
            style={styles.textInput}
          />

          {emptyName || fetchingNameAvailable ? (
            <SfText>{!emptyName ? 'Checking name...' : ''}</SfText>
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
        </View>
      </SfContainer>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {},
  container: {
    flex: 1,
    backgroundColor: Colors.nord5,
  },
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
  },
  welcomeText: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 32,
  },
});

function mapStateToProps(state) {
  return { token: state.auth?.token };
}

export default connect(mapStateToProps)(AuthGate);
