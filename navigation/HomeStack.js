import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/screens/HomeScreen';
import ConversationScreen from '~/screens/ConversationScreen';
import InviteScreen from '~/screens/InviteScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import FriendSettingsScreen from '~/screens/FriendSettingsScreen';

import ChatScreen from '~/screens/ChatScreen';
import GroupBuilderScreen from '~/screens/GroupBuilderScreen';
import GroupSettingsScreen from '~/screens/GroupSettingsScreen';

import useNotificationHandler from '~/h/useNotificationHandler';

import useLight from '~/h/useLight';

const Stack = createStackNavigator();

function HomeStack() {
  const { foregrounds, backgrounds } = useLight();
  useNotificationHandler();

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
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animationEnabled: Platform.OS === 'ios',
        headerStyle,
        headerTitleStyle,
        headerTintColor: foregrounds[0],
      }}
    >
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
      <Stack.Screen name="Invite" component={InviteScreen} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="Friend Settings" component={FriendSettingsScreen} />

      {/*Group chat screens*/}
      <Stack.Screen
        name="Group"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="New Group" component={GroupBuilderScreen} />
      <Stack.Screen name="Add Members" component={GroupBuilderScreen} />
      <Stack.Screen name="Group Settings" component={GroupSettingsScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
