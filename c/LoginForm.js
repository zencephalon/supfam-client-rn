import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import SfContainer from '~/c/SfContainer';

import { useDispatch } from 'react-redux';

import { LOGIN } from '~/apis/auth/actions';
import AuthToken from '~/lib/AuthToken';

import useApi from '~/h/useApi';
import { postLogin, postStartReset } from '~/apis/api';

import { AWAY, OPEN, FREE } from '~/constants/Colors';
import { elementSizes } from '~/constants/Sizes';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const PostLogin = useApi(postLogin);
  const PostStartReset = useApi(postStartReset);
  const navigation = useNavigation();

  const login = React.useCallback(() => {
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
  }, [password, name, PostLogin.call, dispatch]);

  const startReset = React.useCallback(() => {
    if (!name) {
      return;
    }

    PostStartReset.call({ username: name })
      .then((json) => {
        if (!json.error) {
          navigation.navigate('Reset', { token: json.token });
        }
      })
      .catch((e) => {
        showMessage({
          message: 'User name not found, please check your user name',
          BACKGROUND_COLOR: AWAY,
        });
      });
  }, [name, PostStartReset.call, navigation.navigate, showMessage]);

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
      {PostLogin.req.failed && (
        <SfButton
          wide
          round
          title={
            PostStartReset.req.requested
              ? 'Requesting reset...'
              : 'Forgot Password'
          }
          disabled={!name || PostStartReset.req.requested}
          onPress={startReset}
          style={styles.button}
          color={FREE}
        />
      )}
    </SfContainer>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: elementSizes[8],
  },
  textInput: {
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    marginTop: 12,
  },
});

export default LoginForm;
