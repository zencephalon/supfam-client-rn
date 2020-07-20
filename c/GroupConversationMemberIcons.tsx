import * as React from 'react';
import { View } from 'react-native';
import useCachedConversation from '~/h/useCachedConversation';
import ProfileIcon from '~/c/ProfileIcon';

export default React.memo(function GroupConversationMemberIcons({
	conversationId,
	userProfileId,
}: {
	conversationId: number;
	userProfileId: number;
}) {
	const conversation = useCachedConversation(conversationId);

	if (!conversation) {
		return null;
	}

	const otherProfileIds = conversation.member_profile_ids.filter(
		(pId: number) => pId !== userProfileId
	);

	const gridSize = Math.ceil(Math.sqrt(otherProfileIds.length));

	return (
		<View style={{ flexDirection: 'row', width: 48, flexWrap: 'wrap' }}>
			{otherProfileIds
				.slice(0, gridSize * gridSize)
				.map((profileId: number) => (
					<ProfileIcon
						key={profileId}
						profileId={profileId}
						size={48 / gridSize}
						noBadge
					/>
				))}
		</View>
	);
});
