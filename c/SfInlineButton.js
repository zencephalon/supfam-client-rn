import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Colors from '~/constants/Colors';

import useLight from '~/h/useLight';

const SfInlineButton = (props) => {
  const { disabled, title, style, color, ...rest } = props;
  const { light, foregrounds } = useLight();

  const textColor = foregrounds[0];
  const backgroundColor = Colors.RGB_Linear_Shade(
    disabled ? (light ? 0.4 : -0.4) : 0,
    color || Colors.OPEN
  );
  const stateStyle = {
    backgroundColor,
    borderBottomWidth: 4,
    borderBottomColor: disabled
      ? backgroundColor
      : Colors.RGB_Linear_Shade(-0.4, backgroundColor),
  };

  const mergedStyle = [
    styles.exButton,
    disabled ? {} : styles.enabled,
    stateStyle,
    style,
  ];
  return (
    <TouchableOpacity {...rest} style={mergedStyle}>
      <Text
        style={{
          ...styles.buttonText,
          color: textColor,
          marginTop: disabled ? 3 : 0,
          marginBottom: disabled ? 0 : 3,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SfInlineButton;

const styles = StyleSheet.create({
  exButton: {
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
  },
  enabled: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderBottomWidth: 3,
  },
  buttonText: {
    fontSize: 18,
    paddingTop: 4,
    paddingBottom: 4,
  },
});
