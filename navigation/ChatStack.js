import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatsScreen from '~/screens/ChatsScreen';
import ConversationScreen from '~/screens/ConversationScreen';
import InviteScreen from '~/screens/InviteScreen';
import SettingsScreen from '~/screens/SettingsScreen';
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
          headerTitle: 'Chats',
          headerStyle: {
            backgroundColor: backgrounds[0],
            height: 20,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          headerTitleStyle: {
            color: foregrounds[0],
          },
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

export default ChatStack;
