import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import * as Colors from '~/constants/Colors';

// login = () => {
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

import { debounce } from 'lodash';

import { LOGIN } from '~/apis/auth/actions';
import { getNameAvailable, postLogin, postRegister } from '~/apis/auth/api';
import AuthToken from '~/lib/AuthToken';

const LoginForm = ({ password, setPassword, login }) => {
  return (
    <View>
      <SfTextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        textContentType="password"
        onSubmitEditing={login}
        secureTextEntry
        style={styles.textInput}
      />
      <SfButton
        title="Login"
        disabled={!password}
        onPress={login}
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

export default LoginForm;
