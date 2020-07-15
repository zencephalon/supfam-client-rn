import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/screens/HomeScreen';
import ConversationScreen from '~/screens/ConversationScreen';
import InviteScreen from '~/screens/InviteScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import FriendSettingsScreen from '~/screens/FriendSettingsScreen';

import ChatScreen from '~/screens/ChatScreen';
import GroupBuilderScreen from '~/screens/GroupBuilderScreen';
import GroupSettingsScreen from '~/screens/GroupSettingsScreen';

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
          headerTintColor: foregrounds[0],
          headerStyle,
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Friend Settings"
        component={FriendSettingsScreen}
        options={{
          headerTintColor: foregrounds[0],
          headerStyle,
          headerTitleStyle,
        }}
      />

      {/*Group chat screens*/}
      <Stack.Screen
        name="Group"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="New Group"
        component={GroupBuilderScreen}
        options={{
          headerTintColor: foregrounds[0],
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
        name="Add Members"
        component={GroupBuilderScreen}
        options={{
          headerTintColor: foregrounds[0],
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
        name="Group Settings"
        component={GroupSettingsScreen}
        options={{
          headerTintColor: foregrounds[0],
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
