import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import withColorMode from '~/components/ColorMode';
import { accentColor } from '~/constants/Colors';

const ExButton = props => {
  const { title, style, color, ...rest } = props;

  const mergedStyle = { ...styles.exButton, ...style };
  return (
    <TouchableOpacity {...rest} style={mergedStyle}>
      <Text style={{ ...styles.buttonText, color }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  exButton: {
    backgroundColor: accentColor,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 20,
    padding: 5,
  },
});

export default withColorMode(ExButton);
