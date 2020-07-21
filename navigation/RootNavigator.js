import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ReplyModal from '~/c/ReplyModal';
import MessageActionModal from '~/c/MessageActionModal';
import HomeStack from '~/navigation/HomeStack';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

export default function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
			<Stack.Screen name="Root" component={HomeStack} />
			<Stack.Screen
				name="Reply Modal"
				component={ReplyModal}
				options={{
					cardStyle: {
						backgroundColor: 'rgba(0,0,0,0)',
					},
				}}
			/>
			<Stack.Screen
				name="Message Modal"
				component={MessageActionModal}
				options={{
					cardStyle: {
						backgroundColor: 'rgba(0,0,0,0.5)',
					},
					animationEnabled: false,
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
