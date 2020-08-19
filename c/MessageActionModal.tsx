import * as React from 'react';

import { Alert, View, Clipboard, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import EmojiSelector from '~/c/SfEmojiSelector';
import SfSheetButton from '~/c/SfSheetButton';

import BottomSheet from 'reanimated-bottom-sheet';

import useLight from '~/h/useLight';
import useOpenReplyModal from '~h/useOpenReplyModal';
import useProfileId from '~/h/useProfileId';

import { postAddMessageReactions } from '~/apis/api';

import EmojiHistory from '~/lib/EmojiHistory';

import { removeMessage } from '~/lib/QueryCache';
import { postFlagMessage } from '~/apis/api';

import { EmojiButton, MoreEmojiButton } from '~/c/EmojiButton';

import { AWAY } from '~/constants/Colors';

const RenderInner = ({
	showEmojiSelector,
	copyMessage,
	openReplyModal,
	setShowEmojiSelector,
	snapTo,
	messageId,
	messageType,
}: {
	showEmojiSelector: boolean;
	copyMessage: () => void;
	openReplyModal: () => void;
	setShowEmojiSelector: (arg0: boolean) => void;
	snapTo: () => void;
	messageId: number;
	messageType: number;
}) => {
	const { modal, backgrounds, light } = useLight();
	const profileId = useProfileId();

	const onEmojiSelected = React.useCallback(
		(emoji: string): void => {
			postAddMessageReactions({ profileId, messageId, emoji });
			snapTo(2);
		},
		[postAddMessageReactions, profileId, messageId, snapTo]
	);

	const onFlagSelected = React.useCallback(() => {
		Alert.alert(
			'Are you sure?',
			'This message will be removed from view and our staff will review the content. The sender may lose access to Supfam.',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Flag Content',
					onPress: () => {
						removeMessage(messageId);
						snapTo(2);
						postFlagMessage({ messageId });
					},
				},
			]
		);
	}, [messageId, snapTo]);

	return (
		<View style={[styles.panel, { backgroundColor: backgrounds[0] }]}>
			{showEmojiSelector ? (
				<EmojiSelector onEmojiSelected={onEmojiSelected} showSearchBar={true} />
			) : (
				<React.Fragment>
					<View style={styles.mostUsed}>
						{EmojiHistory.mostUsed().map(([emoji]: [string]) => (
							<EmojiButton
								key={emoji}
								emoji={emoji}
								messageId={messageId}
								profileId={profileId}
								snapTo={snapTo}
							/>
						))}
						<MoreEmojiButton
							snapTo={snapTo}
							setShowEmojiSelector={setShowEmojiSelector}
						/>
					</View>
					<SfSheetButton
						title="Flag content"
						onPress={onFlagSelected}
						buttonTextStyle={styles.dangerButton}
					/>
					{messageType !== 1 && (
						<SfSheetButton title="Reply" onPress={openReplyModal} />
					)}
					{messageType !== 1 && (
						<SfSheetButton title="Copy" onPress={copyMessage} />
					)}
					<SfSheetButton title="Cancel" onPress={() => snapTo(2)} />
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

	const copyMessage = React.useCallback(() => {
		Clipboard.setString(message.message);
		showMessage({
			message: 'Copied to clipboard!',
			type: 'info',
		});
		bottomSheet.current.snapTo(2);
	}, [message.message, bottomSheet.current]);

	const _openReplyModal = useOpenReplyModal(
		message.profile_id,
		message.message,
		'message',
		message.conversation_id
	);
	const openReplyModal = React.useCallback(() => {
		navigation.goBack();
		_openReplyModal();
	}, [_openReplyModal, navigation]);

	return (
		<BottomSheet
			ref={bottomSheet}
			snapPoints={[500, 500, 0]}
			renderContent={() => (
				<RenderInner
					showEmojiSelector={showEmojiSelector}
					setShowEmojiSelector={setShowEmojiSelector}
					snapTo={bottomSheet.current?.snapTo}
					copyMessage={copyMessage}
					openReplyModal={openReplyModal}
					messageId={message.id}
					messageType={message.type}
				/>
			)}
			renderHeader={() => <RenderHeader />}
			onCloseEnd={navigation.goBack}
			enabledContentTapInteraction={true}
			enabledInnerScrolling={false}
			enabledContentGestureInteraction={false}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		opacity: 1,
	},
	panel: {
		height: 500,
		backgroundColor: '#f7f5ee',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
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
	mostUsed: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 16,
	},
	dangerButton: {
		color: AWAY,
	},
});
