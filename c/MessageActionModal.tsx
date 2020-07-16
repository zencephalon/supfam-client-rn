import * as React from 'react';

import { View, Clipboard, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import SfText from '~/c/SfText';
import EmojiSelector from '~/c/SfEmojiSelector';
import SfButton from '~/c/SfButton';

import BottomSheet from 'reanimated-bottom-sheet';

import useLight from '~/h/useLight';
import useOpenReplyModal from '~h/useOpenReplyModal';

const RenderInner = ({
	showEmojiSelector,
	copyMessage,
	openReplyModal,
}: {
	showEmojiSelector: boolean;
	copyMessage: () => void;
	openReplyModal: () => void;
}) => {
	const { modal, backgrounds, light } = useLight();
	console.log({ modal });
	return (
		<View style={[styles.panel, { backgroundColor: light ? '#fff' : '#000' }]}>
			{showEmojiSelector ? (
				<EmojiSelector showTabs={false} showSectionTitles={false} />
			) : (
				<React.Fragment>
					<SfButton title="Reply" onPress={openReplyModal} />
					<SfButton title="Copy" onPress={copyMessage} />
				</React.Fragment>
			)}
		</View>
	);
};

const RenderHeader = () => {
	const { light } = useLight();
	return (
		<View style={[styles.header, { backgroundColor: `rgba(0, 0, 0, 0)` }]}>
			<View style={styles.panelHeader}>
				<View
					style={[
						styles.panelHandle,
						{
							backgroundColor: light
								? 'rgba(255, 255, 255, 0.8)'
								: 'rgba(255, 255, 255, 0.4)',
						},
					]}
				/>
			</View>
		</View>
	);
};

export default function MessageActionModal({ navigation, route }) {
	const [showEmojiSelector, setShowEmojiSelector] = React.useState(false);
	const { message } = route.params;

	const bottomSheet = React.useRef();

	const copyMessage = () => {
		Clipboard.setString(message.message);
		showMessage({
			message: 'Copied to clipboard!',
			type: 'info',
		});
		bottomSheet.current.snapTo(2);
	};
	const openReplyModal = useOpenReplyModal(
		message.profile_id,
		message.message,
		'message',
		message.conversation_id
	);

	return (
		<BottomSheet
			ref={bottomSheet}
			snapPoints={[250, 400, 0]}
			renderContent={() => (
				<RenderInner
					showEmojiSelector={showEmojiSelector}
					copyMessage={copyMessage}
					openReplyModal={() => {
						navigation.pop();
						openReplyModal();
					}}
				/>
			)}
			renderHeader={() => <RenderHeader />}
			onCloseEnd={() => {
				navigation.pop();
			}}
		/>
	);
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		opacity: 1,
	},
	box: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
	},
	panelContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	panel: {
		height: 600,
		padding: 20,
		backgroundColor: '#f7f5ee',
		borderTopRightRadius: 40,
		borderTopLeftRadius: 40,
	},
	header: {
		backgroundColor: '#f7f5eee8',
		shadowColor: '#000000',
		paddingTop: 20,
	},
	panelHeader: {
		alignItems: 'center',
	},
	panelHandle: {
		width: 80,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#666666',
		marginBottom: 10,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: 'gray',
		height: 30,
		marginBottom: 10,
	},
	panelButton: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: '#318bfb',
		alignItems: 'center',
		marginVertical: 10,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white',
	},
	photo: {
		width: '100%',
		height: 225,
		marginTop: 30,
	},
	map: {
		height: '100%',
		width: '100%',
	},
});
