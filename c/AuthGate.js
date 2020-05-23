import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SfText from '~/c/SfText';
import SfContainer from '~/c/SfContainer';
import RegistrationForm from '~/c/RegistrationForm';
import LoginForm from '~/c/LoginForm';
import SfButton from '~/c/SfButton';

import CheckInviteFlow from '~/c/CheckInviteFlow';
import VerifyCodeFlow from '~/c/VerifyCodeFlow';

import { FREE, OPEN, AWAY } from '~/constants/Colors';

import downloadUpdate from '~/lib/downloadUpdate';

const Stack = createStackNavigator();

function Welcome(props) {
  return (
    <React.Fragment>
      {/* <SfText style={styles.welcomeText}>Supfam</SfText> */}
      {/* <Image source={require('../assets/images/icon.png')} /> */}
      <SfButton
        color={OPEN}
        title="Login"
        onPress={()=>props.navigation.navigate('Login')}
      />
      <SfButton
        color={FREE}
        title="Register"
        onPress={() => props.navigation.navigate('Register')}
      />
      <SfButton color={AWAY} title="Download Update" onPress={downloadUpdate} />
    </React.Fragment>
  );
}

const AuthGate = function (props) {
  if (props.token) {
    return props.children;
  }
  return (
    // <SfContainer>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Welcome} options={{ title: 'SupFam' }}/>
          <Stack.Screen name="Login" component={LoginForm}/>
          <Stack.Screen name="Register" component={CheckInviteFlow}/>
        </Stack.Navigator>
      </NavigationContainer>
    //* </SfContainer> */}
  );
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
