import * as React from 'react';

import { View, FlatList, StyleSheet, Text } from 'react-native';

import SfText from '~/c/SfText';
import EmojiSelector from '~/c/SfEmojiSelector';
import SfButton from '~/c/SfButton';

import BottomSheet from 'reanimated-bottom-sheet';

const renderInner = ({ showEmojiSelector }: { showEmojiSelector: boolean }) => (
	<View style={styles.panel}>
		{showEmojiSelector ? (
			<EmojiSelector showTabs={false} showSectionTitles={false} />
		) : (
			<SfButton title="reply" />
		)}
	</View>
);

const renderHeader = () => (
	<View style={styles.header}>
		<View style={styles.panelHeader}>
			<View style={styles.panelHandle} />
		</View>
	</View>
);

export default function MessageActionModal({ navigation }) {
	const [showEmojiSelector, setShowEmojiSelector] = React.useState(false);
	return (
		<BottomSheet
			snapPoints={[250, 400, 0]}
			renderContent={() => renderInner({ showEmojiSelector })}
			renderHeader={renderHeader}
			onCloseEnd={() => {
				navigation.pop();
			}}
		/>
	);
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		opacity: 1,
	},
	box: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
	},
	panelContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	panel: {
		height: 600,
		padding: 20,
		backgroundColor: '#f7f5ee',
	},
	header: {
		backgroundColor: '#f7f5eee8',
		shadowColor: '#000000',
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelHeader: {
		alignItems: 'center',
	},
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#00000040',
		marginBottom: 10,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: 'gray',
		height: 30,
		marginBottom: 10,
	},
	panelButton: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: '#318bfb',
		alignItems: 'center',
		marginVertical: 10,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white',
	},
	photo: {
		width: '100%',
		height: 225,
		marginTop: 30,
	},
	map: {
		height: '100%',
		width: '100%',
	},
});
