import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import MentionMatch from '~/t/MentionMatch';

import SfText from '~/c/SfText';

import useLight from '~/h/useLight';

import ProfileIcon from '~/c/ProfileIcon';

type Props = {
	profileId: number;
	profileName: string;
	userName: string;
	fillMention: (username: string) => void;
	mentionMatch: MentionMatch;
};

const MentionItem: React.FunctionComponent<Props> = ({
	profileId,
	profileName,
	userName,
	fillMention,
}) => {
	const { backgrounds } = useLight();
	return (
		<TouchableOpacity
			style={{
				backgroundColor: backgrounds[1],
				marginBottom: 4,
				marginTop: 4,
				paddingRight: 8,
				paddingLeft: 8,
				flexDirection: 'row',
				width: '100%',
			}}
			onPress={() => fillMention(userName)}
		>
			<ProfileIcon noBadge profileId={profileId} size={24} />
			<SfText
				style={{ fontSize: 16, fontWeight: 'bold', flexGrow: 3 }}
			>{`@${userName}`}</SfText>
			<SfText
				style={{ fontSize: 16, marginLeft: 18 }}
			>{`${profileName}`}</SfText>
		</TouchableOpacity>
	);
};

export default MentionItem;
