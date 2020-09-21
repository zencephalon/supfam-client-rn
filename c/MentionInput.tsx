import React from 'react';
import { View, StyleSheet } from 'react-native';

import SfTextInput from '~/c/SfTextInput';
import MentionList from '~/c/MentionList';

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

	const mentionMatch = getMentionSelectionText(text, selection);

	return (
		<View style={style}>
			<MentionList
				conversationId={conversationId}
				mentionMatch={mentionMatch}
			/>
			<SfTextInput
				onSelectionChange={(event) => {
					console.log(event.nativeEvent.selection);
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
