import * as React from 'react';

import {
	View,
	Clipboard,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import SfText from '~/c/SfText';
import EmojiSelector from '~/c/SfEmojiSelector';
import SfSheetButton from '~/c/SfSheetButton';
import BottomSheetButton from '~/c/BottomSheetButton';

import BottomSheet from 'reanimated-bottom-sheet';

import useLight from '~/h/useLight';
import useOpenReplyModal from '~h/useOpenReplyModal';
import useProfileId from '~/h/useProfileId';

import { postAddMessageReactions } from '~/apis/api';

import EmojiHistory from '~/lib/EmojiHistory';

import MoreEmojiIcon from '~/assets/images/more-emoji-icon.png';

const EmojiButton = ({
	emoji,
	profileId,
	messageId,
	snapTo,
}: {
	snapTo: () => void;
	emoji: string;
	profileId: number;
	messageId: number;
}) => {
	return (
		<BottomSheetButton
			style={{ padding: 10 }}
			onPress={() => {
				snapTo(2);
				postAddMessageReactions({ profileId, messageId, emoji });
			}}
		>
			<Text style={{ fontSize: 24 }}>{emoji}</Text>
		</BottomSheetButton>
	);
};

const MoreEmojiButton = ({
	snapTo,
	setShowEmojiSelector,
}: {
	snapTo: () => void;
	setShowEmojiSelector: () => void;
}) => {
	return (
		<BottomSheetButton
			style={{ padding: 10 }}
			onPress={() => {
				snapTo(1);
				setShowEmojiSelector(true);
			}}
		>
			<Image
				source={MoreEmojiIcon}
				style={{
					margin: 2,
					width: 24,
					height: 24,
					marginBottom: 4,
					resizeMode: 'stretch',
				}}
			/>
		</BottomSheetButton>
	);
};

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
	setShowEmojiSelector: () => void;
	snapTo: () => void;
	messageId: number;
	messageType: number;
}) => {
	const { modal, backgrounds, light } = useLight();
	const profileId = useProfileId();

	return (
		<View style={[styles.panel, { backgroundColor: backgrounds[0] }]}>
			{showEmojiSelector ? (
				<EmojiSelector
					onEmojiSelected={(emoji) => {
						postAddMessageReactions({ profileId, messageId, emoji });
						snapTo(2);
					}}
					showSearchBar={true}
				/>
			) : (
				<React.Fragment>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 16 }}>
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
			snapPoints={[420, 500, 0]}
			renderContent={() => (
				<RenderInner
					showEmojiSelector={showEmojiSelector}
					setShowEmojiSelector={setShowEmojiSelector}
					snapTo={bottomSheet.current?.snapTo}
					copyMessage={copyMessage}
					openReplyModal={() => {
						navigation.pop();
						openReplyModal();
					}}
					pop={() => navigation.pop()}
					messageId={message.id}
					messageType={message.type}
				/>
			)}
			renderHeader={() => <RenderHeader />}
			onCloseEnd={() => {
				navigation.pop();
			}}
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
});
