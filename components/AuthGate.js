import * as React from 'react';
import AuthToken from '~/lib/AuthToken';
import { TextInput, Picker, StyleSheet, SafeAreaView } from 'react-native';
import SfTextInput from '~/components/SfTextInput';

const AuthGate = props => {
  const [token, setToken] = React.useState(AuthToken.get());
  const [username, setUsername] = React.useState('');

  return !token ? (
    <SafeAreaView>
      <SfTextInput
        placeholder="User name"
        onChangeText={setUsername}
        value={username}
      />
    </SafeAreaView>
  ) : (
    props.children
  );
};

export default AuthGate;
