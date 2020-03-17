import React from 'react';
import { TextInput } from 'react-native';

import { nord4, nord6 } from '~/constants/Colors';

const SfTextInput = props => {
  return (
    <TextInput style={{ ...SfTextInputStyle, ...props.style }} {...props} />
  );
};

const SfTextInputStyle = {
  fontSize: 30,
  alignSelf: 'stretch',
  borderColor: nord4,
  borderWidth: 1,
  backgroundColor: nord6,
};

export default SfTextInput;
