import React from 'react';
import { View, StyleSheet } from 'react-native';
import SfTextInput from '~/c/SfTextInput';

import MentionList from '~/c/MentionList';

import useConversationMentionsSummary from '~/h/useConversationMentionsSummary';

import { getMentionSelectionText } from '~/lib/mentions';

type Props = {
	onChangeText: React.Dispatch<React.SetStateAction<string>>;
	text: string;
	textInputStyle: React.CSSProperties;
	style: React.CSSProperties;
	conversationId: number;
	[x: string]: any;
};

const MentionInput: React.FunctionComponent<Props> = ({
	onChangeText,
	text,
	textInputStyle,
	style,
	conversationId,
	...rest
}) => {
	const [selection, setSelection] = React.useState({ start: 0, end: 0 });
	const { summary } = useConversationMentionsSummary(conversationId);

	const mentionMatch = getMentionSelectionText(text, selection);

	const filteredSummary = mentionMatch
		? summary.filter(({ profileNameLower, userNameLower }) => {
				return (
					profileNameLower.startsWith(mentionMatch.match) ||
					userNameLower.startsWith(mentionMatch.match)
				);
		  })
		: summary;

	console.log({ filteredSummary, summary, mentionMatch });

	return (
		<View style={style}>
			<MentionList
				summary={filteredSummary}
				mentionMatch={mentionMatch}
				onChangeText={onChangeText}
			/>
			<SfTextInput
				onSelectionChange={(event) => {
					setSelection(event.nativeEvent.selection);
				}}
				onChangeText={(newText: string) => {
					onChangeText(newText);
				}}
				value={text}
				textInputStyle={textInputStyle}
				{...rest}
			/>
		</View>
	);
};

export default MentionInput;
