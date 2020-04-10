import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfButton from '~/c/SfButton';
import * as Colors from '~/constants/Colors';

// handleUsername = (name) => {
//   this.setState({ name });
//   this.fetchNameAvailable(name);
// };

// setPassword = (password) => {
//   this.setState({ password });
// };

// setPasswordConfirmation = (passwordConfirmation) => {
//   this.setState({ passwordConfirmation });
// };

// fetchNameAvailable = debounce((name) => {
//   if (name === '') {
//     this.setState({ fetchingNameAvailable: false });
//     return;
//   }
//   this.setState({ fetchingNameAvailable: true });
//   getNameAvailable(name).then((available) => {
//     this.setState({
//       nameAvailable: available,
//       fetchingNameAvailable: false,
//     });
//   });
// }, 300);

// register = () => {
//   const { name, password, passwordConfirmation } = this.state;
//   if (password !== passwordConfirmation) {
//     // actually do something here to indicate the problem
//     // or just prevent this from even happening
//     return;
//   }
//   this.setState({ loggingIn: true });

//   postRegister({ name, password, passwordConfirmation }).then(({ id }) => {
//     if (id) {
//       this.login();
//     }
//   });
// };

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
