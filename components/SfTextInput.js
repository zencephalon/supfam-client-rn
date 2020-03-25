import React from 'react';
import { TextInput } from 'react-native';

import * as Colors from '~/constants/Colors';

import { useColorScheme } from 'react-native-appearance';

const SfTextInput = props => {
  const colorScheme = useColorScheme();
  const color =
    colorScheme === 'light'
      ? Colors.lightThemeForegrounds[1]
      : Colors.darkThemeForegrounds[1];
  const backgroundColor =
    colorScheme === 'light'
      ? Colors.lightThemeBackgrounds[1]
      : Colors.darkThemeBackgrounds[1];
  const placeholderTextColor =
    colorScheme === 'light'
      ? Colors.lightThemeForegrounds[3]
      : Colors.darkThemeForegrounds[3];
  const borderColor =
    colorScheme === 'light'
      ? Colors.lightThemeBackgrounds[2]
      : Colors.darkThemeBackgrounds[2];
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
  // borderColor: Colors.nord4,
  borderWidth: 1,
  borderRadius: 10,
};

export default SfTextInput;
