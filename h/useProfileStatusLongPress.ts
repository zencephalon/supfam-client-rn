import React from 'react';

import { Clipboard } from 'react-native';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { showMessage } from 'react-native-flash-message';

import useOpenReplyModal from '~/h/useOpenReplyModal';
import useCachedProfile from '~/h/useCachedProfile';
import callPhone from '~/lib/callPhone';

export default function useProfileStatusLongPress(profileId: number) {
	const profile = useCachedProfile(profileId);
	const statusMessage = profile?.status?.message;
	const openReplyModal = useOpenReplyModal(
		profileId,
		statusMessage,
		'status',
		null
	);

	const { showActionSheetWithOptions } = useActionSheet();
	return React.useCallback(() => {
		const options = ['Call Phone', 'Copy', 'Reply', 'Cancel'];
		const cancelButtonIndex = 3;

		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						callPhone(profile.phone);
						break;
					case 1:
						Clipboard.setString(statusMessage);
						showMessage({
							message: 'Copied to clipboard!',
							type: 'info',
						});
						break;
					case 2:
						openReplyModal();
						break;
					default:
						break;
				}
			}
		);
	}, [statusMessage, openReplyModal]);
}
