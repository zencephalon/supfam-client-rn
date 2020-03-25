import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/components/SfTextInput';
import SfButton from '~/components/SfButton';
import * as Colors from '~/constants/Colors';

const RegistrationForm = ({
  password,
  passwordConfirmation,
  setPassword,
  setPasswordConfirmation,
  register,
}) => {
  return (
    <View>
      <SfTextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        textContentType="newPassword"
        secureTextEntry
        style={styles.textInput}
      />
      <SfTextInput
        placeholder="password confirmation"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        textContentType="newPassword"
        secureTextEntry
        onSubmitEditing={register}
        style={styles.textInput}
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
