import * as React from 'react';

import { View, SafeAreaView } from 'react-native';

import useLight from '~/h/useLight';
import { StyleSheet } from 'react-native';

export default function SfContainer(props) {
  const { backgrounds } = useLight();
  const backgroundColor = backgrounds[0];

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
  },
});
