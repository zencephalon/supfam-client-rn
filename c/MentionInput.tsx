import React from 'react';
import { View, StyleSheet } from 'react-native';

import SfTextInput from '~/c/SfTextInput';
import MentionList from '~/c/MentionList';

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

export default MentionInput;
