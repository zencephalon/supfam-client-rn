import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/screens/HomeScreen';
import ConversationScreen from '~/screens/ConversationScreen';
import InviteScreen from '~/screens/InviteScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import useLight from '~/h/useLight';

const Stack = createStackNavigator();

function HomeStack() {
  const { foregrounds, backgrounds } = useLight();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Conversation" component={ConversationScreen} />
      <Stack.Screen
        name="Invite"
        component={InviteScreen}
        options={{
          headerStyle: {
            backgroundColor: backgrounds[1],
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          headerTitleStyle: {
            color: foregrounds[0],
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: backgrounds[1],
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          headerTitleStyle: {
            color: foregrounds[0],
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
