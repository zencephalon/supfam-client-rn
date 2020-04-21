import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';

import { useDispatch } from 'react-redux';

import { LOGIN } from '~/apis/auth/actions';
import AuthToken from '~/lib/AuthToken';

import useApi from '~/hooks/useApi';
import { postLogin } from '~/apis/api';

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
    <View>
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
        title={PostLogin.req.requested ? 'Logging in...' : 'Log in'}
        disabled={!password || !name || PostLogin.req.requested}
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
