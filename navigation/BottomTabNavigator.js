import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '~/c/TabBarIcon';
import MapScreen from '~/screens/MapScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import HomeStack from '~/navigation/HomeStack';
import ChatStack from '~/navigation/ChatStack';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

import useLight from '~/h/useLight';

export default function BottomTabNavigator() {
  const { backgrounds, foregrounds } = useLight();

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: foregrounds[0],
        inactiveTintColor: foregrounds[2],
        inactiveBackgroundColor: backgrounds[0],
        activeBackgroundColor: backgrounds[0],
        style: {
          borderTopWidth: 0,
          backgroundColor: backgrounds[0],
        },
        safeAreaInset: { bottom: 'never' },
      }}
    >
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-map" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Fam',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-people" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-chatboxes" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
