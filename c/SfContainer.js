import * as React from 'react';

import { View, SafeAreaView } from 'react-native';

import useLight from '~/h/useLight';
import { StyleSheet } from 'react-native';

export default function SfContainer(props) {
  const { backgrounds } = useLight();
  let backgroundColor = backgrounds[0];
  if(props.darkBg) {
    backgroundColor = 'black';
  }

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <SafeAreaView style={styles.contentContainer}>
        {props.children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
    flex: 1,
  },
});
