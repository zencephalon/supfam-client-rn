import React from 'react';
import { FlatList, View, Text } from 'react-native';
import SfText from '~/components/SfText';

import Message from '~/components/Message';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMessage = ({ item, index }) => {
    console.log(item);
    return <Message message={item} />;
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
