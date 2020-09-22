import React from 'react';
import { View, Platform } from 'react-native';
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

	const onSelection = React.useCallback(
		(event) => {
			setSelection(event.nativeEvent.selection);
		},
		[setSelection]
	);

	const fillMention = React.useCallback(
		(username, onspace = false) => {
			console.log({ username, mentionMatch });
			if (!mentionMatch) {
				return;
			}

			const newText =
				text.slice(0, mentionMatch.start) +
				`${onspace ? '' : '@'}${username} ` +
				text.slice(mentionMatch.end).trimLeft();
			onChangeText(newText);
		},
		[mentionMatch, text, onChangeText]
	);

	const _onChangeText = React.useCallback(
		(newText) => {
			if (
				newText.length === text.length + 1 &&
				newText[newText.length - 1] === ' ' &&
				filteredSummary.length === 1
			) {
				fillMention(filteredSummary[0].userName, Platform.OS === 'ios');
			} else {
				onChangeText(newText);
			}
		},
		[filteredSummary, fillMention, onChangeText]
	);

	return (
		<View style={style}>
			<MentionList
				summary={filteredSummary}
				mentionMatch={mentionMatch}
				fillMention={fillMention}
			/>
			<SfTextInput
				onSelectionChange={onSelection}
				onChangeText={_onChangeText}
				value={text}
				textInputStyle={textInputStyle}
				{...rest}
			/>
		</View>
	);
};

export default MentionInput;
