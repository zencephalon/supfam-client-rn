import * as React from 'react';
import { View } from 'react-native';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import ConfettiCannon from 'react-native-confetti-cannon';

const OnboardingContainer = ({ props }) => {
	const [showCannon, setShowCannon] = React.useState(false);
	return (
		<View>
			<SfText>Onboarding</SfText>
			<SfButton title="Finish onboarding" onPress={() => setShowCannon(true)} />
			{showCannon && (
				<ConfettiCannon
					count={50}
					origin={{ x: 200, y: 10 }}
					fadeOut
					// colors={['#000000', '#ffffff']}
				/>
			)}
		</View>
	);
};

export default OnboardingContainer;
