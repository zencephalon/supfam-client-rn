import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '~/navigation/DrawerNavigator';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

export default function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Root" component={DrawerNavigator} />
			{/*TODO: should probably implement this */}
			{/*<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>*/}
		</Stack.Navigator>
	);
}
