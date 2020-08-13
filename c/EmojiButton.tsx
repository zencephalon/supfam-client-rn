import * as React from 'react';

import { Text, StyleSheet, Image } from 'react-native';

import BottomSheetButton from '~/c/BottomSheetButton';
import MoreEmojiIcon from '~/assets/images/more-emoji-icon.png';

import { postAddMessageReactions } from '~/apis/api';

export const EmojiButton = ({
	emoji,
	profileId,
	messageId,
	snapTo,
}: {
	snapTo: () => void;
	emoji: string;
	profileId: number;
	messageId: number;
}): React.ReactElement => {
	const onPress = React.useCallback(() => {
		snapTo(2);
		postAddMessageReactions({ profileId, messageId, emoji });
	}, [snapTo, postAddMessageReactions]);

	return (
		<BottomSheetButton style={styles.sheetButton} onPress={onPress}>
			<Text style={styles.emojiText}>{emoji}</Text>
		</BottomSheetButton>
	);
};

export const MoreEmojiButton = ({
	snapTo,
	setShowEmojiSelector,
}: {
	snapTo: () => void;
	setShowEmojiSelector: (boolean) => void;
}): React.ReactElement => {
	const onPress = React.useCallback(() => {
		snapTo(1);
		setShowEmojiSelector(true);
	}, [snapTo, setShowEmojiSelector]);

	return (
		<BottomSheetButton style={styles.sheetButton} onPress={onPress}>
			<Image source={MoreEmojiIcon} style={styles.moreEmojiIcon} />
		</BottomSheetButton>
	);
};

const styles = StyleSheet.create({
	sheetButton: {
		padding: 10,
	},
	moreEmojiIcon: {
		margin: 2,
		width: 24,
		height: 24,
		marginBottom: 4,
		resizeMode: 'stretch',
	},
	emojiText: {
		fontSize: 24,
	},
});
