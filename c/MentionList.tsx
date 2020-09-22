import React from 'react';
import { View, StyleSheet } from 'react-native';

import MentionMatch from '~/t/MentionMatch';

import MentionItem from '~/c/MentionItem';

import useLight from '~/h/useLight';

const styles = StyleSheet.create({
	mentionList: {
		position: 'absolute',
		bottom: '100%',
		width: '100%',
		borderRadius: 8,
		borderColor: 'black',
		marginBottom: 4,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		zIndex: 8,
	},
});

type Props = {
	summary: Array<{ profileId: number; profileName: string; userName: string }>;
	mentionMatch: MentionMatch;
	fillMention: (username: string) => void;
};

const MentionList: React.FunctionComponent<Props> = ({
	summary,
	mentionMatch,
	fillMention,
}) => {
	const { backgrounds } = useLight();
	if (!mentionMatch) {
		return null;
	}

	return (
		<View style={[styles.mentionList, { backgroundColor: backgrounds[1] }]}>
			{summary.map(({ profileId, profileName, userName }) => (
				<MentionItem
					key={profileId}
					profileId={profileId}
					userName={userName}
					profileName={profileName}
					mentionMatch={mentionMatch}
					fillMention={fillMention}
				/>
			))}
		</View>
	);
};

export default MentionList;
