import React from 'react';

import { View } from 'react-native';

import useLight from '~/h/useLight';

export default function SfTopBar(props) {
  const { backgrounds, light } = useLight();
  return (
    <View
      style={{
        paddingRight: 8,
        paddingLeft: 8,
        paddingBottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: backgrounds[0],
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: light ? 0.1 : 0.4,
        shadowRadius: 3,
        zIndex: 2,
        ...(props.style || {}),
      }}
    >
      {props.children}
    </View>
  );
}
