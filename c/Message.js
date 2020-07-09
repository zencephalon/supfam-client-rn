import React from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import {formatMessageTimeflag} from '~/lib/clockwork';

import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';
import ProfileName from '~/c/ProfileName';

import TypingText from '~/c/TypingText';
import MessageImagePreview from '~/c/MessageImagePreview';
import MessageText from '~/c/MessageText';

function Message(props) {
  const { message, isOwnMessage, fromSameUser, breakAbove } = props;

  const [ showDate, setShowDate ] = React.useState(false);

  const sentDate = new Date(message.updated_at);
  const timeFlag = formatMessageTimeflag(sentDate);

  return (
    <View>
      {
        breakAbove || showDate ?
        <View style={{
          alignItems: 'center',
          marginTop: 16,
          marginBottom: 8,
        }}>
          <SfText style={{
            fontSize: 16
          }}>
            {timeFlag}
          </SfText>
        </View> : null
      }
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 4,
          marginTop: fromSameUser && !message.breakAbove ? 0 : 12,
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowDate(!showDate);
          }}
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            maxWidth: '80%',
          }}
        >
          <>
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
              <TypingText time={message.receivedAt} />
            </SfText>
          ) : null}
          </>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Message;
