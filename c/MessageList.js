import React from 'react';
import { FlatList } from 'react-native';

import Message from '~/c/Message';

const ONE_HOUR = 60 * 60 * 1000;

const needsBreakAbove = (message, prevSentMessage) => {
  if(!prevSentMessage) { return false; }
  const prevMessageTime = new Date(prevSentMessage.updated_at);
  const messageTime = new Date(message.updated_at);
  return messageTime.getTime() - prevMessageTime.getTime() > ONE_HOUR;
}

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
      <FlatList
        onEndReached={() => canFetchMore && fetchMore()}
        onEndReachedThreshold={0.1}
        data={messages}
        renderItem={this.renderMessage}
        style={{ flex: 1 }}
        keyExtractor={(m) => `${m.id}`}
        inverted
      />
    );
  }
}

export default MessageList;
