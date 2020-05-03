import React from 'react';
import { View } from 'react-native';

import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';

import useLight from '~/h/useLight';

import TypingText from '~/c/TypingText';

function Message(props) {
  const { backgrounds } = useLight();
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 4,
        marginTop: props.fromSameUser ? 0 : 12,
        alignItems: 'flex-start',
        justifyContent: props.isOwnMessage ? 'flex-end' : 'flex-start',
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      <View style={{ width: 32 }}>
        {!props.isOwnMessage && !props.fromSameUser && (
          <ProfileIcon profileId={props.message.profile_summary.id} size={24} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          maxWidth: '80%',
        }}
      >
        <SfText
          style={{
            fontSize: 16,
            backgroundColor: props.isOwnMessage
              ? backgrounds[2]
              : backgrounds[1],
            borderRadius: 10,
            overflow: 'hidden',
            padding: 8,
          }}
        >
          {props.message.message}
        </SfText>
        {props.message.id === 'i' ? (
          <SfText style={{ fontSize: 10 }}>
            ...
            <TypingText time={props.message.receivedAt} />
          </SfText>
        ) : null}
      </View>
    </View>
  );
}

export default Message;
