import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Colors from '~/constants/Colors';

import useLight from '~/hooks/useLight';

const SfButton = (props) => {
  const { disabled, title, style, color, ...rest } = props;
  const { light, foregrounds } = useLight();

  const stateStyle = light
    ? disabled
      ? styles.lightDisabled
      : styles.lightEnabled
    : disabled
    ? styles.darkDisabled
    : styles.darkEnabled;
  const textColor = disabled ? foregrounds[3] : foregrounds[4];

  const mergedStyle = [
    styles.exButton,
    ...(disabled ? [] : [styles.enabled]),
    stateStyle,
    style,
  ];
  return (
    <TouchableOpacity {...rest} style={mergedStyle}>
      <Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SfButton;

const styles = StyleSheet.create({
  exButton: {
    marginBottom: 10,
    alignItems: 'center',
    // borderRadius: 10,
  },
  enabled: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderBottomWidth: 3,
  },
  lightEnabled: {
    backgroundColor: Colors.lightThemeBackgrounds[2],
    borderBottomColor: Colors.lightThemeBackgrounds[3],
  },
  lightDisabled: {
    backgroundColor: Colors.lightThemeBackgrounds[1],
    color: Colors.nord4,
  },
  darkEnabled: {
    backgroundColor: Colors.darkThemeBackgrounds[3],
    borderBottomColor: Colors.darkThemeBackgrounds[2],
  },
  darkDisabled: {
    backgroundColor: Colors.darkThemeBackgrounds[1],
    color: Colors.nord4,
  },
  buttonText: {
    fontSize: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
