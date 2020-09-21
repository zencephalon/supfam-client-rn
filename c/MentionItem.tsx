import React from 'react';
import { View, StyleSheet } from 'react-native';

import SfText from '~/c/SfText';

import useLight from '~/h/useLight';

import ProfileIcon from '~/c/ProfileIcon';

type Props = {
	profileId: number;
	profileName: string;
	userName: string;
	onChangeText: React.Dispatch<React.SetStateAction<string>>;
	mentionMatch: {
		match: string;
		start: number;
		end: number;
	} | null;
};

const MentionItem: React.FunctionComponent<Props> = ({
	profileId,
	profileName,
	userName,
	onChangeText,
}) => {
	const { backgrounds } = useLight();
	return (
		<View
			style={{
				backgroundColor: backgrounds[1],
				padding: 4,
				paddingTop: 8,
				flexDirection: 'row',
				width: '100%',
			}}
		>
			<ProfileIcon noBadge profileId={profileId} size={24} />
			<SfText
				style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 3 }}
			>{`@${userName}`}</SfText>
			<SfText
				style={{ fontSize: 16, marginLeft: 18 }}
			>{`${profileName}`}</SfText>
		</View>
	);
};

export default MentionItem;
