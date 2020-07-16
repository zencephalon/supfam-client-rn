import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import Message from '~/c/Message';
import SfText from '~/c/SfText';
import EmojiSelector from '~/c/SfEmojiSelector';

const ONE_HOUR = 60 * 60 * 1000;

import BottomSheet from 'reanimated-bottom-sheet';

const needsBreakAbove = (message, prevSentMessage) => {
  if (!prevSentMessage) {
    return false;
  }
  const prevMessageTime = new Date(prevSentMessage.updated_at);
  const messageTime = new Date(message.updated_at);
  return messageTime.getTime() - prevMessageTime.getTime() > ONE_HOUR;
};

const renderInner = () => (
  <View style={styles.panel}>
    <EmojiSelector showTabs={false} showSectionTitles={false} />
  </View>
);

const renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
);

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }
  renderMessage = ({ item, index }) => {
    const prevSentMessage = this.props.messages[index + 1];

    return (
      <Message
        message={item}
        isOwnMessage={item.profile_id === this.props.meProfileId}
        fromSameUser={item.profile_id === prevSentMessage?.profile_id}
        breakAbove={needsBreakAbove(item, prevSentMessage)}
      />
    );
  };

  render() {
    const { fetchMore, canFetchMore, messages } = this.props;
    return (
      <>
        <FlatList
          onEndReached={() => canFetchMore && fetchMore()}
          onEndReachedThreshold={0.1}
          data={messages}
          renderItem={this.renderMessage}
          style={{ flex: 1 }}
          keyExtractor={(m) => `${m.id}`}
          inverted
        />
        <BottomSheet
          snapPoints={[250, 400, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
        />
      </>
    );
  }
}

export default MessageList;

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
    backgroundColor: '#f7f5eee8',
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
