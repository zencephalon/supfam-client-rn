import React from 'react';
import { FlatList, View, Text } from 'react-native';

import SfText from '~/c/SfText';
import UserIcon from '~/c/UserIcon';

import useLight from '~/hooks/useLight';

function Message(props) {
  const { backgrounds } = useLight();
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: props.fromSameUser ? 0 : 8,
        alignItems: 'flex-end',
        justifyContent: props.isOwnMessage ? 'flex-end' : 'flex-start',
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      <View style={{ width: 32 }}>
        {!props.isOwnMessage && !props.fromSameUser && (
          <UserIcon uri={props.message.user_summary.avatar_url} size={24} />
        )}
      </View>
      <SfText
        style={{
          fontSize: 16,
          backgroundColor: props.isOwnMessage ? backgrounds[2] : backgrounds[1],
          borderRadius: 10,
          overflow: 'hidden',
          padding: 8,
          maxWidth: '80%',
        }}
      >
        {props.message.message}
      </SfText>
    </View>
  );
}

export default Message;
