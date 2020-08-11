import React from 'react';
import { getLinkPreview } from 'link-preview-js';
import { Linking, TouchableOpacity, View, Share } from 'react-native';
import Image from 'react-native-fast-image';

import SfText from '~/c/SfText';
import useLight from '~/h/useLight';

export default function SfLinkPreview({ url }) {
	const [loading, setLoading] = React.useState(true);
	const [linkPreview, setLinkPreview] = React.useState(null);
	const { backgrounds } = useLight();

	React.useEffect(() => {
		getLinkPreview(url)
			.then((data) => {
				setLoading(false);
				setLinkPreview({
					isUri: true,
					linkTitle: data.title,
					linkDesc: data.description,
					linkImg:
						data.images && data.images.length > 0
							? data.images.find(
									(element) =>
										element.includes('.png') ||
										element.includes('.jpg') ||
										element.includes('.jpeg')
							  )
							: undefined,
					linkFavicon:
						data.favicons && data.favicons.length > 0
							? data.favicons[data.favicons.length - 1]
							: undefined,
				});
			})
			.catch((error) => {
				setLoading(false);
			});
	}, [url]);

	const displayPlain = loading || !linkPreview;

	return (
		<TouchableOpacity
			onPress={() => Linking.openURL(url)}
			onLongPress={() => Share.share({ url })}
			style={{ backgroundColor: backgrounds[1], padding: 8, borderRadius: 8 }}
		>
			{displayPlain && <SfText style={{ fontSize: 16 }}>{url}</SfText>}
			{!displayPlain && (
				<View>
					{linkPreview.linkImg && (
						<Image
							source={{ uri: linkPreview.linkImg }}
							style={{ width: '100%', height: 100, marginBottom: 4 }}
						/>
					)}
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						{linkPreview.linkFavicon && (
							<Image
								source={{ uri: linkPreview.linkFavicon }}
								style={{ width: 20, height: 20, marginRight: 8 }}
							/>
						)}
						<SfText
							style={{
								fontSize: 16,
								marginBottom: 4,
								flexShrink: 1,
							}}
						>
							{linkPreview.linkTitle}
						</SfText>
					</View>
					<SfText style={{ fontSize: 12 }}>{linkPreview.linkDesc}</SfText>
				</View>
			)}
		</TouchableOpacity>
	);
}
