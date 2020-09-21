import React from 'react';
import { View, StyleSheet } from 'react-native';

import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';

import useConversationMentionsSummary from '~/h/useConversationMentionsSummary';

type Props = {
	onChangeText: React.Dispatch<React.SetStateAction<string>>;
	text: string;
	textInputStyle: React.CSSProperties;
	style: React.CSSProperties;
	conversationId: number;
	[x: string]: any;
};

const MentionList: React.FunctionComponent = ({ conversationId }) => {
	const { summary } = useConversationMentionsSummary(conversationId);

	return (
		<View style={styles.mentionList}>
			{summary.map(([profileId, profileName, userName]) => (
				<SfText key={profileId}>{userName}</SfText>
			))}
		</View>
	);
};

const MentionInput: React.FunctionComponent<Props> = ({
	onChangeText,
	text,
	textInputStyle,
	style,
	conversationId,
	...rest
}) => {
	return (
		<View style={style}>
			<MentionList conversationId={conversationId} />
			<SfTextInput
				onChangeText={onChangeText}
				value={text}
				textInputStyle={textInputStyle}
				{...rest}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	mentionList: {
		position: 'absolute',
		bottom: 0,
	},
});

export default MentionInput;
