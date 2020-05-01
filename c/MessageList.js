import React from 'react';
import { FlatList } from 'react-native';

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
        isOwnMessage={item.user_summary?.id === this.props.meProfileId}
        fromSameUser={item.user_summary?.id === nextItem?.user_summary?.id}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.messages}
        renderItem={this.renderMessage}
        style={{ flex: 1 }}
        keyExtractor={(m) => `${m.id}`}
        inverted
      />
    );
  }
}

export default MessageList;
