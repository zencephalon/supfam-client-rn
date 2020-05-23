import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SfText from '~/c/SfText';
import SfContainer from '~/c/SfContainer';
import LoginForm from '~/c/LoginForm';
import SfButton from '~/c/SfButton';

import CheckInviteFlow from '~/c/CheckInviteFlow';

import { FREE, OPEN, AWAY } from '~/constants/Colors';

import downloadUpdate from '~/lib/downloadUpdate';

const Stack = createStackNavigator();

function Welcome(props) {
  return (
    <View style={styles.welcomeView}>
      <Image source={require('../assets/images/icon.png')} />
      <View style={{ width: '100%' }}>
        <SfButton
          color={OPEN}
          title="Login"
          onPress={() => props.navigation.navigate('Login')}
        />
        <SfButton
          color={FREE}
          title="Register"
          onPress={() => props.navigation.navigate('Register')}
        />
        <SfButton
          color={AWAY}
          title="Download Update"
          onPress={downloadUpdate}
        />
      </View>
    </View>
  );
}

const AuthGate = function (props) {
  if (props.token) {
    return props.children;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Welcome}
          options={{ title: 'SupFam', headerShown: false}}
        />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={CheckInviteFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  welcomeView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

function mapStateToProps(state) {
  return { token: state.auth?.token };
}

export default connect(mapStateToProps)(AuthGate);
