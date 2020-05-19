import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import SfText from '~/c/SfText';
import SfContainer from '~/c/SfContainer';
import RegistrationForm from '~/c/RegistrationForm';
import LoginForm from '~/c/LoginForm';
import SfButton from '~/c/SfButton';

import CheckInviteFlow from '~/c/CheckInviteFlow';
import VerifyCodeFlow from '~/c/VerifyCodeFlow';

import { FREE, OPEN, AWAY } from '~/constants/Colors';

import downloadUpdate from '~/lib/downloadUpdate';

function Welcome(props) {
  return (
    <React.Fragment>
      <SfText style={styles.welcomeText}>Supfam</SfText>
      {/* <Image source={require('../assets/images/icon.png')} /> */}
      <SfButton
        color={OPEN}
        title="Login"
        onPress={() => props.setSelection('login')}
      />
      <SfButton
        color={FREE}
        title="Register"
        onPress={() => props.setSelection('register')}
      />
      <SfButton color={AWAY} title="Download Update" onPress={downloadUpdate} />
    </React.Fragment>
  );
}

const AuthGate = function (props) {
  const [selection, setSelection] = React.useState('default');
  React.useEffect(() => {
    setSelection('default');
  }, [props.token]);

  const renders = {
    default: <Welcome setSelection={setSelection} />,
    login: <LoginForm />,
    register: (
      <CheckInviteFlow
        render={({ token }) => (
          <VerifyCodeFlow
            token={token}
            render={({ token }) => <RegistrationForm token={token} />}
          />
        )}
      />
    ),
  };

  if (props.token) {
    return props.children;
  }

  return <SfContainer>{renders[selection]}</SfContainer>;
};

const styles = StyleSheet.create({
  welcomeText: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 32,
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return { token: state.auth?.token };
}

export default connect(mapStateToProps)(AuthGate);
