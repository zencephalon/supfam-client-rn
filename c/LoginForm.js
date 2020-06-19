import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';

import { useDispatch } from 'react-redux';

import { LOGIN } from '~/apis/auth/actions';
import AuthToken from '~/lib/AuthToken';

import useApi from '~/h/useApi';
import { postLogin } from '~/apis/api';

import { BRILLIANT_1 } from '~/constants/Colors';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const PostLogin = useApi(postLogin);

  const login = () => {
    if (!password) {
      return;
    }

    PostLogin.call({ name, password })
      .then((json) => {
        if (!json.error) {
          AuthToken.set(json);
          dispatch(LOGIN(json));
        }
      })
      .catch((e) => {
        console.log('WTF dude', e);
      });
  };

  return (
    <View style={styles.loginContainer}>
      <SfTextInput
        placeholder="username"
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
        textContentType="username"
        style={styles.textInput}
      />
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
        round
        title={PostLogin.req.requested ? 'Logging in...' : 'Log in'}
        disabled={!password || !name || PostLogin.req.requested}
        onPress={login}
        style={styles.button}
        color={BRILLIANT_1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 100,
  },
  textInput: {
    marginTop: 8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  button: {
    marginTop: 40,
  },
});

export default LoginForm;
