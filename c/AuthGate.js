import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { connect } from 'react-redux';

import SfText from '~/c/SfText';
import SfContainer from '~/c/SfContainer';
import RegistrationForm from '~/c/RegistrationForm';
import LoginForm from '~/c/LoginForm';
import SfButton from '~/c/SfButton';

import CheckInviteFlow from '~/c/CheckInviteFlow';
import VerifyCodeFlow from '~/c/VerifyCodeFlow';

import { FREE, OPEN, AWAY, BRILLIANT_1, BRILLIANT_2 } from '~/constants/Colors';

function Welcome(props) {
  return (
    <View style={styles.welcomeCluster}>
      <View style={styles.welcomeLogoContainer}>
        <Image style={styles.welcomeLogo} source={require('../assets/images/icon.png')} />
      </View>
      <SfText style={styles.welcomeText}>strictly for the fam</SfText>
      <SfButton
        round
        color={BRILLIANT_1}
        // color={OPEN}
        title="Login"
        onPress={() => props.setSelection('login')}
      />
      <SfButton
        round
        // color={BRILLIANT_2}
        color={FREE}
        title="Register"
        onPress={() => props.setSelection('register')}
      />
      <SfText style={styles.subText}>download update</SfText>
      {/* <SfButton round color={BRILLIANT_2} title="Download Update" onPress={downloadUpdate} /> */}
    </View>
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

  return <SfContainer darkBg>{renders[selection]}</SfContainer>;
};

const styles = StyleSheet.create({
  welcomeContainer: {
    backgroundColor: 'black',
  },
  welcomeText: {
    marginTop: 12,
    marginBottom: 28,
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
  welcomeCluster: {
    marginTop: 80,
  },
  welcomeLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeLogo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  subText: {
    fontSize: 18,
    marginTop: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#cfcd51',
    // color: '#fe86fe',
  }
});

function mapStateToProps(state) {
  return { token: state.auth?.token };
}

export default connect(mapStateToProps)(AuthGate);
