import React from 'react';

import { useColorScheme } from 'react-native-appearance';
import { Text, StyleSheet } from 'react-native';

import * as Colors from '~/constants/Colors';

const ExText = props => {
  colorScheme = useColorScheme();
  const { children, style, ...rest } = props;
  color =
    colorScheme === 'light'
      ? Colors.lightThemeForegrounds[0]
      : Colors.darkThemeForegrounds[0];

  const mergedStyle = { color, ...styles.exText, ...style };
  return (
    <Text style={mergedStyle} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  exText: {
    fontSize: 24,
    fontVariant: ['tabular-nums'],
  },
});

export default ExText;
