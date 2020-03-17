import React from 'react';
import { View } from 'react-native';
import SfTextInput from '~/components/SfTextInput';
import SfButton from '~/components/SfButton';

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
      />
      <SfTextInput
        placeholder="password confirmation"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        textContentType="newPassword"
        secureTextEntry
        onSubmitEditing={register}
      />
      <SfButton
        title="Register"
        disabled={password !== passwordConfirmation}
        onPress={register}
      />
    </View>
  );
};

export default RegistrationForm;
