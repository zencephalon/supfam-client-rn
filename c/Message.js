import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';
import ProfileName from '~/c/ProfileName';

import TypingText from '~/c/TypingText';
import MessageImagePreview from '~/c/MessageImagePreview';
import MessageText from '~/c/MessageText';

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
      <View style={{ width: 40 }}>
        {!isOwnMessage && !fromSameUser && (
          <ProfileIcon profileId={message.profile_id} size={32} />
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
        {!isOwnMessage && !fromSameUser && (
          <ProfileName
            profileId={message.profile_id}
            style={{ fontSize: 12, alignSelf: 'flex-start', marginBottom: 4 }}
          />
        )}
        {message.type === 0 && (
          <MessageText text={message.message} isOwnMessage={isOwnMessage} />
        )}
        {message.type === 1 && message.image && (
          <MessageImagePreview image={message.image} />
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
