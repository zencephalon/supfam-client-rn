import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/components/SfTextInput';
import SfButton from '~/components/SfButton';
import * as Colors from '~/constants/Colors';

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
