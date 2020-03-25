import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Colors from '~/constants/Colors';

const ExButton = props => {
  const { disabled, title, style, color, ...rest } = props;

  const stateStyle = disabled ? styles.disabled : styles.enabled;
  const textColor = disabled ? Colors.nord5 : color;

  const mergedStyle = { ...styles.exButton, ...stateStyle, ...style };
  return (
    <TouchableOpacity {...rest} style={mergedStyle}>
      <Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ExButton;

const styles = StyleSheet.create({
  exButton: {
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.accentColor,
    shadowColor: Colors.nord0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  disabled: {
    backgroundColor: Colors.disabledColor,
    // shadowColor: Colors.nord5,
    shadowColor: Colors.nord0,
    color: Colors.nord4,
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },
  buttonText: {
    fontSize: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
