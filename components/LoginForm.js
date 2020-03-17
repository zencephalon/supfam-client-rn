import React from 'react';
import { View } from 'react-native';
import SfTextInput from '~/components/SfTextInput';
import SfButton from '~/components/SfButton';

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
      />
      <SfButton title="Login" disabled={!password} onPress={login} />
    </View>
  );
};

export default LoginForm;
