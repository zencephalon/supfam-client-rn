import * as React from 'react';

import { SafeAreaView } from 'react-native';

import useLight from '~/hooks/useLight';

export default function SfContainer(props) {
  const { backgrounds } = useLight();
  const backgroundColor = backgrounds[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      {props.children}
    </SafeAreaView>
  );
}
