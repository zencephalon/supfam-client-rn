import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import * as Colors from '~/constants/Colors';

import { debounce } from 'lodash';

import { LOGIN } from '~/apis/auth/actions';
import { getNameAvailable, postRegister, postLogin } from '~/apis/api';
import AuthToken from '~/lib/AuthToken';

import useApi from '~/hooks/useApi';

// const login = () => {
//   const { name, password } = this.state;
//   if (!password) {
//     return;
//   }
//   this.setState({ loggingIn: true });

//   postLogin({ name, password }).then((json) => {
//     AuthToken.set(json);
//     this.props.dispatch(LOGIN(json));
//   });
// };

const RegistrationForm = ({ token }) => {
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [name, setName] = React.useState('');
  const [nameAvailable, setNameAvailable] = React.useState(false);
  const [fetchingNameAvailable, setFetchingNameAvailable] = React.useState(
    false
  );
  const PostRegister = useApi(postRegister);

  const handleUsername = (name) => {
    setName(name);
    fetchNameAvailable(name);
  };

  const fetchNameAvailable = debounce((name) => {
    if (name === '') {
      setFetchingNameAvailable(false);
      return;
    }
    setFetchingNameAvailable(true);
    getNameAvailable({ name }).then((available) => {
      console.log(JSON.stringify(available));
      setNameAvailable(available);
      setFetchingNameAvailable(false);
    });
  }, 300);

  const register = () => {
    PostRegister.call({ name, password, passwordConfirmation, token });
  };

  // const register = () => {
  //   const { name, password, passwordConfirmation } = this.state;
  //   if (password !== passwordConfirmation) {
  //     // actually do something here to indicate the problem
  //     // or just prevent this from even happening
  //     return;
  //   }
  //   this.setState({ loggingIn: true });

  //   postRegister({ name, password, passwordConfirmation }).then(({ id }) => {
  //     if (id) {
  //       this.login();
  //     }
  //   });
  // };

  return (
    <View>
      <SfText style={{ marginTop: 16, marginBottom: 16 }}>
        Thanks for verifying!
      </SfText>
      <SfTextInput
        working={fetchingNameAvailable}
        ok={!fetchingNameAvailable && !!name && nameAvailable}
        bad={!fetchingNameAvailable && !!name && !nameAvailable}
        placeholder="username"
        autoCapitalize="none"
        value={name}
        onChangeText={handleUsername}
        textContentType="username"
        style={styles.textInput}
      />
      <SfTextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        textContentType="newPassword"
        secureTextEntry
        style={styles.textInput}
        ok={password.length >= 8}
      />
      <SfTextInput
        placeholder="password confirmation"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        textContentType="newPassword"
        secureTextEntry
        onSubmitEditing={register}
        style={styles.textInput}
        bad={passwordConfirmation && passwordConfirmation !== password}
        ok={passwordConfirmation && passwordConfirmation === password}
      />
      <SfButton
        title="Register"
        disabled={!password || password !== passwordConfirmation}
        onPress={register}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 8,
  },
  button: {
    marginTop: 12,
  },
});

export default RegistrationForm;
