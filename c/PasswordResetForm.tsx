import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import SfContainer from '~/c/SfContainer';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import { LOGIN } from '~/apis/auth/actions';
import { postResetPassword } from '~/apis/api';
import AuthToken from '~/lib/AuthToken';

import useApi from '~/h/useApi';
import { elementSizes, fontSizes } from '~/constants/Sizes';
import { AWAY, lightThemeForegrounds } from '~/constants/Colors';

const PasswordResetForm = ({ token }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

  const PostResetPassword = useApi(postResetPassword, {
    onConfirm: (json) => {
      AuthToken.set({ token: json.token });
      dispatch(LOGIN(json));
    },
    onError: (error) => {
      // TODO, we could do a lot better here
      showMessage({
        backgroundColor: AWAY,
        message: JSON.stringify(error),
      });
    },
  });

  const reset = () => {
    if (password !== passwordConfirmation) {
      return;
    }

    PostResetPassword.call({ password, passwordConfirmation, token });
  };

  return (
    <SfContainer>
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
        onSubmitEditing={reset}
        style={styles.textInput}
        bad={passwordConfirmation && passwordConfirmation !== password}
        ok={passwordConfirmation && passwordConfirmation === password}
      />
      <SfButton
        round
        title="Reset"
        disabled={!password || password !== passwordConfirmation}
        onPress={reset}
        style={styles.button}
      />
    </SfContainer>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: elementSizes[1],
    marginBottom: elementSizes[1],
  },
  button: {
    marginTop: elementSizes[2],
  },
  formLabel: {
    marginBottom: elementSizes[3],
    marginTop: elementSizes[3],
  },
  formContainer: {
    marginLeft: elementSizes[3],
    marginRight: elementSizes[3],
    marginTop: elementSizes[8],
  },
  subText: {
    marginTop: elementSizes[2],
    fontSize: fontSizes[2],
    color: lightThemeForegrounds[3],
  },
});

export default PasswordResetForm;
