import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import useLight from '~/h/useLight';

// This button is designed to look like a text hyperlink.

const SfTextButton = (props) => {
  const { disabled, title, style, ...rest } = props;
  const { foregrounds } = useLight();

  const textColor = foregrounds[0];

  const mergedStyle = [
    styles.exButton,
    style,
  ];
  return (
    <TouchableOpacity {...rest} style={mergedStyle}>
      <Text
        style={[
          styles.buttonText,
          {
            background: 'none',
            color: textColor,
            marginTop: disabled ? 3 : 0,
            marginBottom: disabled ? 0 : 3,
            opacity: disabled ? 0.5 : 1,
          },
          props.buttonTextStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SfTextButton;

const styles = StyleSheet.create({
  exButton: {
    marginBottom: 10,
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  buttonText: {
    fontSize: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
