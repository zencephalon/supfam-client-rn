import React from 'react';
import { View } from 'react-native';

import useLight from '~/h/useLight';
import SfText from '~/c/SfText';
import MessageText from '~/c/MessageText';
import ProfileName from '~/c/ProfileName';

import { Text, TouchableOpacity, Share } from 'react-native';

export default function QuotedMessageText({
  quoted,
  text,
  isOwnMessage,
  links,
  quoteType,
  quotedProfileId,
  quoterProfileId,
}) {
  const { backgrounds } = useLight();

  return (
    <View style={{ alignItems: isOwnMessage ? 'flex-end' : 'flex-start' }}>
      {quotedProfileId && (
        <SfText style={{ fontSize: 12 }}>
          {isOwnMessage ? 'You' : <ProfileName profileId={quoterProfileId} />}{' '}
          replied to <ProfileName profileId={quotedProfileId} />
          's {quoteType}:
        </SfText>
      )}
      {quoted && (
        <SfText
          style={{
            fontSize: 16,
            backgroundColor: isOwnMessage ? backgrounds[1] : backgrounds[2],
            padding: 8,
            borderRadius: 10,
            overflow: 'hidden',
            paddingBottom: 16,
            marginBottom: -8,
          }}
        >
          {quoted}
        </SfText>
      )}
      <MessageText text={text} links={links} isOwnMessage={isOwnMessage} />
    </View>
  );
}
