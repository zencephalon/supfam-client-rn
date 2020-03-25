import React from 'react';
import { TextInput } from 'react-native';

import { nord3, nord4, nord6, nord0 } from '~/constants/Colors';

const SfTextInput = props => {
  return (
    <TextInput
      placeholderTextColor={nord3}
      style={{ ...SfTextInputStyle, ...props.style }}
      {...props}
    />
  );
};

const SfTextInputStyle = {
  fontSize: 30,
  alignSelf: 'stretch',
  borderColor: nord4,
  borderWidth: 1,
  backgroundColor: nord6,
  placeholderTextColor: nord0,
};

export default SfTextInput;
