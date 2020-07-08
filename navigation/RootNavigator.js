import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '~/navigation/DrawerNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Root" component={DrawerNavigator} />
			{/*<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>*/}
		</Stack.Navigator>
	);
}
