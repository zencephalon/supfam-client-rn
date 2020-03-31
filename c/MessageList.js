import React from 'react';
import { FlatList, View, Text } from 'react-native';
import SfText from '~/c/SfText';

import Message from '~/c/Message';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMessage = ({ item, index }) => {
    const nextItem = this.props.messages[index + 1];

    return (
      <Message
        message={item}
        isOwnMessage={item.user_summary.id === this.props.me.id}
        fromSameUser={item.user_summary.id === nextItem?.user_summary?.id}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.messages}
        renderItem={this.renderMessage}
        style={{ flex: 1 }}
        keyExtractor={m => `${m.id}`}
      />
    );
  }
}

export default MessageList;
