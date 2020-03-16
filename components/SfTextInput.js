import React from 'react';
import { TextInput } from 'react-native';

const SfTextInput = props => {
  return (
    <TextInput style={{ ...SfTextInputStyle, ...props.style }} {...props} />
  );
};

const SfTextInputStyle = {
  fontSize: 30,
  alignSelf: 'stretch',
  borderColor: '#D8DEE9',
  borderWidth: 1,
};

export default SfTextInput;
