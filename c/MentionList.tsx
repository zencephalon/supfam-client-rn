import React from 'react';
import { View, StyleSheet } from 'react-native';

import MentionItem from '~/c/MentionItem';

const styles = StyleSheet.create({
	mentionList: {
		position: 'absolute',
		bottom: 30,
		width: '100%',
	},
});

type Props = {
	summary: Array<{ profileId: number; profileName: string; userName: string }>;
	mentionMatch: {
		match: string;
		start: number;
		end: number;
	} | null;
	onChangeText: React.Dispatch<React.SetStateAction<string>>;
};

const MentionList: React.FunctionComponent<Props> = ({
	summary,
	mentionMatch,
}) => {
	if (!mentionMatch) {
		return null;
	}

	return (
		<View style={styles.mentionList}>
			{summary.map(({ profileId, profileName, userName }) => (
				<MentionItem
					key={profileId}
					profileId={profileId}
					userName={userName}
					profileName={profileName}
					onChangeText={onChangeText}
				/>
			))}
		</View>
	);
};

export default MentionList;
