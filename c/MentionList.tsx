import React from 'react';
import { View, StyleSheet } from 'react-native';

import MentionItem from '~/c/MentionItem';

import useConversationMentionsSummary from '~/h/useConversationMentionsSummary';

const styles = StyleSheet.create({
	mentionList: {
		position: 'absolute',
		bottom: 30,
		width: '100%',
	},
});

type Props = {
	conversationId: number;
	mentionMatch: {
		match: string;
		start: number;
		end: number;
	} | null;
};

const MentionList: React.FunctionComponent<Props> = ({
	conversationId,
	mentionMatch,
}) => {
	const { summary } = useConversationMentionsSummary(conversationId);

	if (!mentionMatch) {
		return null;
	}

	return (
		<View style={styles.mentionList}>
			{summary.map(([profileId, profileName, userName]) => (
				<MentionItem
					key={profileId}
					profileId={profileId}
					userName={userName}
					profileName={profileName}
				/>
			))}
		</View>
	);
};

export default MentionList;
