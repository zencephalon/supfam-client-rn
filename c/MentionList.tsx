import React from 'react';
import { View, StyleSheet } from 'react-native';

import SfText from '~/c/SfText';

import useConversationMentionsSummary from '~/h/useConversationMentionsSummary';

const styles = StyleSheet.create({
	mentionList: {
		position: 'absolute',
		bottom: 0,
	},
});

type Props = {
	conversationId: number;
};

const MentionList: React.FunctionComponent<Props> = ({ conversationId }) => {
	const { summary } = useConversationMentionsSummary(conversationId);

	return (
		<View style={styles.mentionList}>
			{summary.map(([profileId, profileName, userName]) => (
				<SfText key={profileId}>{userName}</SfText>
			))}
		</View>
	);
};

export default MentionList;
