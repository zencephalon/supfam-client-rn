import React from 'react';

import { Text, StyleSheet } from 'react-native';

import useLight from '~/h/useLight';

const ExText = (props) => {
  const { foregrounds } = useLight();
  const { children, style, ...rest } = props;
  color = foregrounds[0];

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
