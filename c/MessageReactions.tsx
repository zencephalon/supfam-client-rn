import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SfText from '~/c/SfText';
import _ from 'lodash';

import ProfileIcon from '~/c/ProfileIcon';

import useLight from '~/h/useLight';
import useLiveMessageReactions from '~/h/useLiveMessageReactions';
import useProfileId from '~/h/useProfileId';

import {
	postAddMessageReactions,
	postRemoveMessageReactions,
} from '~/apis/api';

function ReactionChip({
	emoji,
	profileIds,
	messageId,
}: {
	emoji: string;
	profileIds: number[];
	messageId: number;
}) {
	const { backgrounds } = useLight();
	const profileId = useProfileId();
	const didReact = profileIds.includes(profileId);
	const apiCall = didReact
		? postRemoveMessageReactions
		: postAddMessageReactions;

	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				backgroundColor: didReact ? backgrounds[4] : backgrounds[3],
				padding: 4,
				borderRadius: 8,
				marginLeft: 2,
				marginBottom: 2,
				alignItems: 'center',
			}}
			onPress={() => apiCall({ emoji, profileId, messageId })}
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
		</TouchableOpacity>
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
	const { reactions: liveReactions } = useLiveMessageReactions(messageId);
	const _reactions = liveReactions || reactions;
	if (!_reactions) {
		return null;
	}
	return (
		<View
			style={{
				flexDirection: 'row',
				alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
				justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
				marginTop: -8,
				marginBottom: 4,
				marginRight: 8,
				marginLeft: 46,
				flexWrap: 'wrap',
			}}
		>
			{_.toPairs(_reactions)
				.filter((pair) => pair[1].length > 0)
				.map(([emoji, profileIds]: [string, number[]]) => (
					<ReactionChip
						key={emoji}
						emoji={emoji}
						profileIds={profileIds}
						messageId={messageId}
					/>
				))}
		</View>
	);
}
