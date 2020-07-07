import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import SfText from '~/c/SfText';

import { nord10 } from '~/constants/Colors';

const EmptyListPlaceholder = ({ text }) => {
  return (
    <View style={styles.placeholder}>
      <SfText style={styles.placeholderText}>{text}</SfText>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 20,
    textAlign: 'center',
    width: '80%',
    color: nord10,
  },
});

export default EmptyListPlaceholder;
