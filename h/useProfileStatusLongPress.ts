import React from 'react';

import { Clipboard } from 'react-native';

import useOpenReplyModal from '~/h/useOpenReplyModal';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { showMessage } from 'react-native-flash-message';

import useCachedProfile from '~/h/useCachedProfile';

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
		const options = ['Copy', 'Reply', 'Cancel'];
		const cancelButtonIndex = 2;

		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						Clipboard.setString(statusMessage);
						showMessage({
							message: 'Copied to clipboard!',
							type: 'info',
						});
						break;
					case 1:
						openReplyModal();
						break;
					default:
						break;
				}
			}
		);
	}, [statusMessage, openReplyModal]);
}
