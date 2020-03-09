import * as React from 'react';
import AuthToken from '~/lib/AuthToken';
import { TextInput, Picker, StyleSheet, SafeAreaView } from 'react-native';
import SfTextInput from '~/components/SfTextInput';
import { API_URL } from '~/lib/constants';
import { debounce } from 'lodash';

class AuthGate extends React.Component {
  constructor(props) {
    this.state = {
      fetchingNameAvailable: false,
      nameAvailable: null,
      token: AuthToken.get(),
      username: '',
    };
    super(props);
  }

  fetchNameAvailable = debounce(username => {
    this.setState({ fetchingNameAvailable: true });
    fetch(`${API_URL}available/${username}`)
      .then(resp => resp.json())
      .then(available => {
        this.setState({
          nameAvailable: available,
          fetchingNameAvailable: false,
        });
      });
  });

  handleUsername = username => {
    this.setState({ username });
    this.fetchNameAvailable(username);
  };

  render() {
    const { token, username, fetchingNameAvailable } = this.state;

    return !token ? (
      <SafeAreaView>
        <SfTextInput
          placeholder="User name"
          onChangeText={handleUsername}
          value={username}
        />
        {fetchingNameAvailable ? 'Loading...' : nameAvailable}
      </SafeAreaView>
    ) : (
      this.props.children
    );
  }
}

export default AuthGate;
