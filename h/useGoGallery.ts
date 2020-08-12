import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function useGoGallery(message: Object) {
	const navigation = useNavigation();

	return React.useCallback(() => {
		navigation.navigate('Gallery', {
			images: [
				{
					source: { uri: message.data.image.uri },
					dimensions: {
						width: message.data.image.width,
						height: message.data.image.height,
					},
				},
			],
		});
	}, [message]);
}
