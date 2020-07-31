import * as React from 'react';

import FriendList from '~/c/FriendList';
import StatusCenter from '~/c/StatusCenter';
import HomeTopBar from '~/c/HomeTopBar';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import OnboardingContainer from '~/c/OnboardingContainer';

export default function HomeScreen({ navigation }) {
	return (
		<SfKeyboardAvoidingView keyboardVerticalOffset={-48}>
			<HomeTopBar title="Supfam" />
			<FriendList navigation={navigation} />
			<OnboardingContainer />
			<StatusCenter />
		</SfKeyboardAvoidingView>
	);
}
