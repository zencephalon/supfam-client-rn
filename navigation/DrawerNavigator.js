import * as React from 'react';
import MapScreen from '~/screens/MapScreen';
import SettingsScreen from '~/screens/SettingsScreen';
import HomeStack from '~/navigation/HomeStack';
import ChatStack from '~/navigation/ChatStack';

import useNotificationHandler from '~/h/useNotificationHandler';

const INITIAL_ROUTE_NAME = 'Home';

import useLight from '~/h/useLight';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { backgrounds, foregrounds } = useLight();
  useNotificationHandler();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="back"
      drawerStyle={{
        backgroundColor: backgrounds[0],
      }}
      drawerContentOptions={{
        labelStyle: {
          color: foregrounds[0],
        },
        activeTintColor: backgrounds[2],
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      {/*<Drawer.Screen name="Groups" component={ChatStack} />*/}
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
