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
        isOwnMessage={item.profile_id === this.props.meProfileId}
        fromSameUser={item.profile_id === nextItem?.profile_id}
      />
    );
  };

  render() {
    return (
      <FlatList
        onEndReached={() => console.log('ILUVVVVUUUUUU end reached')}
        onEndReachedThreshold={0.1}
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
