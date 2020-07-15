import React from 'react';
import { View } from 'react-native';

import useLight from '~/h/useLight';
import SfText from '~/c/SfText';
import MessageText from '~/c/MessageText';

import { Text, TouchableOpacity, Share } from 'react-native';

export default function QuotedMessageText({
  quoted,
  text,
  isOwnMessage,
  links,
}) {
  const { backgrounds } = useLight();

  return (
    <View style={{ alignItems: isOwnMessage ? 'flex-end' : 'flex-start' }}>
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
