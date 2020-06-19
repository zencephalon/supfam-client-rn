import React from 'react';

import useLight from '~/h/useLight';
import SfText from '~/c/SfText';

export default function MessageText(props) {
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
