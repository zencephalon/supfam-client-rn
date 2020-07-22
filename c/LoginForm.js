import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import SfContainer from '~/c/SfContainer';

import { useDispatch } from 'react-redux';

import { LOGIN } from '~/apis/auth/actions';
import AuthToken from '~/lib/AuthToken';

import useApi from '~/h/useApi';
import { postLogin } from '~/apis/api';

import { OPEN } from '~/constants/Colors';
import { elementSizes } from '~/constants/Sizes';

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
          AuthToken.set({ token: json.token });
          dispatch(LOGIN(json));
        }
      })
      .catch((e) => {
        console.log('WTF dude', e);
      });
  };

  return (
    <SfContainer>
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
        wide
        round
        title={PostLogin.req.requested ? 'Logging in...' : 'Log in'}
        disabled={!password || !name || PostLogin.req.requested}
        onPress={login}
        style={styles.button}
        color={OPEN}
      />
    </SfContainer>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: elementSizes[8],
  },
  textInput: {
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    marginTop: 24,
  },
});

export default LoginForm;
