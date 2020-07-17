import * as React from 'react';
import { View } from 'react-native';
import SfText from '~/c/SfText';
import _ from 'lodash';

import useProfileId from '~/h/useProfileId';

import useLight from '~/h/useLight';
import ProfileIcon from '~/c/ProfileIcon';

function ReactionChip({
	emoji,
	profileIds,
}: {
	emoji: string;
	profileIds: number[];
}) {
	const { backgrounds } = useLight();
	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: backgrounds[3],
				padding: 4,
				borderRadius: 8,
				marginLeft: 2,
				marginTop: -8,
				marginBottom: 4,
				alignItems: 'center',
			}}
		>
			<SfText style={{ fontSize: 16 }}>{emoji}</SfText>
			{profileIds.length < 3 ? (
				profileIds.map((profileId) => (
					<ProfileIcon
						key={profileId}
						profileId={profileId}
						size={16}
						noBadge
					/>
				))
			) : (
				<SfText style={{ fontSize: 16 }}>{profileIds.length}</SfText>
			)}
		</View>
	);
}

export default function MessageReactions({
	reactions,
	messageId,
	isOwnMessage,
}: {
	reactions: any;
	messageId: number;
	isOwnMessage: boolean;
}) {
	console.log({ reactions });
	return (
		<View
			style={{
				flexDirection: 'row',
				alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
				marginRight: 8,
				marginLeft: 46,
			}}
		>
			{_.toPairs(reactions).map(([emoji, profileIds]: [string, number[]]) => (
				<ReactionChip key={emoji} emoji={emoji} profileIds={profileIds} />
			))}
		</View>
	);
}
