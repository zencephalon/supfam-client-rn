import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import { useDispatch } from 'react-redux';

import { debounce } from 'lodash';

import { LOGIN } from '~/apis/auth/actions';
import { getNameAvailable, postRegister } from '~/apis/api';
import AuthToken from '~/lib/AuthToken';

import useApi from '~/h/useApi';

import useConstCallback from 'use-const-callback';

const debounced = debounce(
  ({ name, setFetchingNameAvailable, getNameAvailable, setNameAvailable }) => {
    if (name === '') {
      setFetchingNameAvailable(false);
      return;
    }
    setFetchingNameAvailable(true);
    getNameAvailable({ name }).then((available) => {
      setNameAvailable(available);
      setFetchingNameAvailable(false);
    });
  },
  300
);

const useFetchNameAvailable = ({
  setFetchingNameAvailable,
  getNameAvailable,
  setNameAvailable,
  debounced,
}) => {
  return useConstCallback((name) => {
    debounced({
      name,
      setFetchingNameAvailable,
      getNameAvailable,
      setNameAvailable,
    });
  });
};

const useHandleUsername = ({
  setName,
  setFetchingNameAvailable,
  fetchNameAvailable,
}) => {
  return React.useCallback(
    (name) => {
      setName(name);
      setFetchingNameAvailable(true);
      fetchNameAvailable(name);
    },
    [setName, fetchNameAvailable, setFetchingNameAvailable]
  );
};

const RegistrationForm = ({ token }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [name, setName] = React.useState('');
  const [nameAvailable, setNameAvailable] = React.useState(false);
  const [fetchingNameAvailable, setFetchingNameAvailable] = React.useState(
    false
  );
  const PostRegister = useApi(postRegister);

  const fetchNameAvailable = useFetchNameAvailable({
    setFetchingNameAvailable,
    getNameAvailable,
    setNameAvailable,
    debounced,
  });

  const handleUsername = useHandleUsername({
    setName,
    setFetchingNameAvailable,
    fetchNameAvailable,
  });

  const nameAndFetched = !fetchingNameAvailable && !!name;
  const nameOk = nameAndFetched && nameAvailable;
  const nameBad = nameAndFetched && !nameAvailable;

  const register = () => {
    if (password !== passwordConfirmation || nameBad) {
      return;
    }

    PostRegister.call({ name, password, passwordConfirmation, token }).then(
      (json) => {
        AuthToken.set(json);
        dispatch(LOGIN(json));
      }
    );
  };

  return (
    <View style={styles.formContainer}>
      <SfText style={styles.formLabel}>
        Thanks for verifying!
      </SfText>
      <SfTextInput
        working={fetchingNameAvailable}
        ok={nameOk}
        bad={nameBad}
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
        round
        title="Register"
        disabled={!password || password !== passwordConfirmation}
        onPress={register}
        style={styles.button}
      />
      <SfText style={{ fontSize: 16, color: "#fe86fe" }}>
        By registering you agree to our Terms and Conditions
      </SfText>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 8,
    marginBottom: 10,
  },
  button: {
    marginTop: 12,
  },
  formLabel: {
    marginBottom: 16,
    marginTop: 16,
    color: 'white'
  },
  formContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 80,
  },
});

export default RegistrationForm;
