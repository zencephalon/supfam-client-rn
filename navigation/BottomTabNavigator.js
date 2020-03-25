import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '~/components/TabBarIcon';
import MapScreen from '~/screens/MapScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import HomeStack from '~/navigation/HomeStack';
import { StatusBar } from 'react-native';

import { useColorScheme } from 'react-native-appearance';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

import * as Colors from '~/constants/Colors';

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <React.Fragment>
      <StatusBar
        barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
      />
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
          activeTintColor: Colors.tabIconSelected,
          inactiveTintColor: Colors.tabIconDefault,
          inactiveBackgroundColor: Colors.nord5, //statusColors[statusMe?.color || 0],
          activeBackgroundColor: Colors.nord5, //statusColors[statusMe?.color || 0],
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
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-home" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-settings" />
            ),
          }}
        />
      </BottomTab.Navigator>
    </React.Fragment>
  );
}
