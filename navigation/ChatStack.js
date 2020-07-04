import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatsScreen from '~/screens/ChatsScreen';
import ChatScreen from '~/screens/ChatScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import GroupBuilderScreen from '~/screens/GroupBuilderScreen';
import useLight from '~/h/useLight';

const Stack = createStackNavigator();

function ChatStack() {
  const { foregrounds, backgrounds } = useLight();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={ChatsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Conversation"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="New Group"
        component={GroupBuilderScreen}
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
        name="Add Members"
        component={GroupBuilderScreen}
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

export default ChatStack;
