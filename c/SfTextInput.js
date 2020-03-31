import React from 'react';
import { TextInput } from 'react-native';

import useLight from '~/hooks/useLight';

const SfTextInput = props => {
  const { foregrounds, backgrounds } = useLight();
  const color = foregrounds[1];
  const backgroundColor = backgrounds[1];
  const placeholderTextColor = foregrounds[2];
  const borderColor = backgrounds[2];

  const style = {
    backgroundColor,
    color,
    borderColor,
    ...SfTextInputStyle,
    ...props.style,
  };
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor}
      {...props}
      style={style}
    />
  );
};

const SfTextInputStyle = {
  fontSize: 30,
  alignSelf: 'stretch',
  borderWidth: 1,
  borderRadius: 10,
  padding: 12,
  fontSize: 32,
};

export default SfTextInput;
