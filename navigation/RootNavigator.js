import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '~/navigation/DrawerNavigator';

import ReplyStatusModal from '~/c/ReplyStatusModal';
import AddChoiceModal from '~/c/AddChoiceModal';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

export default function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
			<Stack.Screen name="Root" component={DrawerNavigator} />
			<Stack.Screen
				name="Reply Status"
				component={ReplyStatusModal}
				options={{
					cardStyle: {
						backgroundColor: 'rgba(0,0,0,0)',
					}
				}}
			/>
			<Stack.Screen
				name="Add"
				component={AddChoiceModal}
				options={{
					cardStyle: {
						backgroundColor: 'rgba(0,0,0,0)',
					}
				}}
			/>

			{/*TODO: should probably implement this */}
			{/*<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>*/}
		</Stack.Navigator>
	);
}
