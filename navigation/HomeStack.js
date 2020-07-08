import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/screens/HomeScreen';
import ConversationScreen from '~/screens/ConversationScreen';
import InviteScreen from '~/screens/InviteScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import FriendSettingsScreen from '~/screens/FriendSettingsScreen';
import useLight from '~/h/useLight';

const Stack = createStackNavigator();

function HomeStack() {
  const { foregrounds, backgrounds } = useLight();

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
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Invite"
        component={InviteScreen}
        options={{
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Friend Settings"
        component={FriendSettingsScreen}
        options={{
          headerStyle,
          headerTitleStyle,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
