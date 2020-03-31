import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '~/c/TabBarIcon';
import MapScreen from '~/screens/MapScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import HomeStack from '~/navigation/HomeStack';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

import useLight from '~/hooks/useLight';

export default function BottomTabNavigator() {
  const { backgrounds, foregrounds } = useLight();
  return (
    <React.Fragment>
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
          activeTintColor: foregrounds[0],
          inactiveTintColor: foregrounds[2],
          inactiveBackgroundColor: backgrounds[0], //statusColors[statusMe?.color || 0],
          activeBackgroundColor: backgrounds[0], //statusColors[statusMe?.color || 0],
          style: {
            borderTopWidth: 0,
          },
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
