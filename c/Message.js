import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';

import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';

import useLight from '~/h/useLight';

import TypingText from '~/c/TypingText';

function MessageText(props) {
  const { backgrounds } = useLight();
  return (
    <SfText
      style={{
        fontSize: 16,
        backgroundColor: props.isOwnMessage ? backgrounds[2] : backgrounds[1],
        borderRadius: 10,
        overflow: 'hidden',
        padding: 8,
      }}
    >
      {props.text}
    </SfText>
  );
}

function Message(props) {
  const { message, isOwnMessage, fromSameUser } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 4,
        marginTop: fromSameUser ? 0 : 12,
        alignItems: 'flex-start',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      <View style={{ width: 32 }}>
        {!isOwnMessage && !fromSameUser && (
          <ProfileIcon profileId={message.profile_id} size={24} />
        )}
        {message.queued && <ActivityIndicator size="small" />}
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          maxWidth: '80%',
        }}
      >
        {message.type === 0 && (
          <MessageText text={message.message} isOwnMessage={isOwnMessage} />
        )}
        {message.type === 1 && (
          <Image
            source={{ uri: message.filepath, isStatic: true }}
            style={{ width: 200, height: 200 }}
          />
        )}
        {message.i ? (
          <SfText style={{ fontSize: 10 }}>
            ...
            <TypingText time={message.receivedAt} />
          </SfText>
        ) : null}
      </View>
    </View>
  );
}

export default Message;
