import * as React from 'react';

import useLight from '~/h/useLight';

import SfText from '~/c/SfText';

export default function MessagePreview({ message }) {
  const { backgrounds } = useLight();
  // TODO: handle non-text messages
  return (
    <SfText
      style={{
        fontSize: 16,
        backgroundColor: backgrounds[1],
        borderRadius: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 8,
        paddingLeft: 8,
        marginTop: 8,
        marginLeft: 8,
        alignSelf: 'flex-end',
        // apparently necessary for borderRadius to work
        overflow: 'hidden',
      }}
      numberOfLines={1}
    >
      {message?.message}
    </SfText>
  );
}
