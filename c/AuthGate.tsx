import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';

import SfText from '~/c/SfText';
import SfContainer from '~/c/SfContainer';
import RegistrationForm from '~/c/RegistrationForm';
import LoginForm from '~/c/LoginForm';
import SfButton from '~/c/SfButton';

import CheckInviteFlow from '~/c/CheckInviteFlow';
import VerifyCodeFlow from '~/c/VerifyCodeFlow';

import { FREE, OPEN, nord13 } from '~/constants/Colors';
import { fontSizes, elementSizes } from '~/constants/Sizes';

import useLight from '~/h/useLight';

const Stack = createStackNavigator();

function Welcome(props) {
  return (
    <SfContainer>
      <View style={styles.welcomeLogoContainer}>
        <Image
          style={styles.welcomeLogo}
          source={require('../assets/images/homesplash.png')}
        />
      </View>
      <SfText style={styles.welcomeText}>simply for your fam</SfText>
      <SfButton
        round
        color={OPEN}
        title="Login"
        onPress={() => props.navigation.navigate('Login')}
      />
      <SfButton
        round
        color={FREE}
        title="Register"
        onPress={() => props.navigation.navigate('Register')}
      />
      <SfText style={styles.subText}>download update</SfText>
      {/* <SfButton round color={BRILLIANT_2} title="Download Update" onPress={downloadUpdate} /> */}
    </SfContainer>
  );
}

const AuthGate = function (props) {
  const [selection, setSelection] = React.useState('default');
  const { backgrounds, foregrounds } = useLight();
  React.useEffect(() => {
    setSelection('default');
  }, [props.token]);

  if (props.token) {
    return props.children;
  }

  const headerStyle = {
    backgroundColor: backgrounds[1],
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  };

  const headerTitleStyle = {
    color: foregrounds[0],
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle, headerTitleStyle }}>
        <Stack.Screen
          name="Home"
          component={Welcome}
          options={{ title: 'Supfam', headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register">
          {() => (
            <CheckInviteFlow
              render={({ token }) => (
                <VerifyCodeFlow
                  token={token}
                  render={({ token }) => <RegistrationForm token={token} />}
                />
              )}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    backgroundColor: 'black',
  },
  welcomeText: {
    marginTop: elementSizes[2],
    marginBottom: elementSizes[4],
    fontSize: fontSizes[4],
    textAlign: 'center',
  },
  welcomeLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeLogo: {
    width: 256,
    height: 256,
    resizeMode: 'contain',
  },
  subText: {
    fontSize: fontSizes[3],
    marginTop: elementSizes[5],
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: nord13,
    // color: '#fe86fe',
  },
});

function mapStateToProps(state) {
  return { token: state.auth?.token };
}

export default connect(mapStateToProps)(AuthGate);
