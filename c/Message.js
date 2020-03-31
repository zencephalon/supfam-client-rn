import React from 'react';
import { FlatList, View, Text } from 'react-native';
import SfText from '~/c/SfText';

import useLight from '~/hooks/useLight';

function Message(props) {
  const { backgrounds } = useLight();
  return (
    <View
      style={{
        backgroundColor: backgrounds[1],
        borderRadius: 10,
        padding: 8,
        margin: 4,
      }}
    >
      <SfText style={{ fontSize: 16 }}>{props.message.message}</SfText>
    </View>
  );
}

export default Message;
