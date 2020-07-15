import React from 'react';

import useLight from '~/h/useLight';
import SfText from '~/c/SfText';

import { Text, TouchableOpacity, Share } from 'react-native';
import { View } from 'react-native';

export default function MessageText({ text, isOwnMessage, links }) {
  const { backgrounds } = useLight();

  const textStyle = React.useMemo(
    () => ({
      fontSize: 16,
      backgroundColor: isOwnMessage ? backgrounds[2] : backgrounds[1],
      overflow: 'hidden',
      padding: 8,
      borderRadius: 10,
    }),
    [backgrounds]
  );

  if (!links || links.length === 0) {
    return <SfText style={textStyle}>{text}</SfText>;
  }

  const textChunks = [];
  let startIndex = 0;
  let i = 0;

  links.forEach((link) => {
    const [start, end] = link.indices;
    textChunks.push({
      text: text.substring(startIndex, start),
      type: 'text',
      id: i++,
    });
    textChunks.push({
      text: text.substring(start, end),
      type: 'link',
      id: i++,
    });
    startIndex = end;
  });

  textChunks.push({
    text: text.substr(startIndex),
    type: 'text',
    id: i++,
  });

  return (
    <SfText style={textStyle}>
      {textChunks.map((chunk) => {
        if (chunk.type == 'text') {
          return <Text key={chunk.id}>{chunk.text}</Text>;
        }

        return (
          <Text key={chunk.id} style={{ textDecorationLine: 'underline' }}>
            {chunk.text}
          </Text>
        );
      })}
    </SfText>
  );
}
