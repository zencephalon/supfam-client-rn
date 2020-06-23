import React from 'react';
import { TextInput, View, ActivityIndicator } from 'react-native';

import useLight from '~/h/useLight';

import * as Colors from '~/constants/Colors';

import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const SfTextInput = (props) => {
  const { foregrounds, backgrounds } = useLight();
  const color = foregrounds[1];
  const backgroundColor = backgrounds[1];
  const placeholderTextColor = foregrounds[2];
  const borderColor = props.ok
    ? Colors.FREE
    : props.bad
    ? Colors.AWAY
    : backgrounds[2];

  const style = {
    backgroundColor,
    color,
    borderColor,
    ...SfTextInputStyle,
    ...props.textInputStyle,
  };
  return (
    <View style={props.style}>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        {...props}
        style={style}
      />
      {!!props.working && (
        <ActivityIndicator
          size="small"
          color={Colors.OPEN}
          style={{
            position: 'absolute',
            left: '90%',
            top: '50%',
            marginTop: -12,
          }}
        />
      )}
      {!!props.ok && (
        <MaterialCommunityIcons
          name="check-circle"
          style={{
            position: 'absolute',
            left: '90%',
            top: '50%',
            marginTop: -12,
            color: Colors.FREE,
          }}
          size={24}
        />
      )}
      {!!props.bad && (
        <Feather
          name="x-circle"
          style={{
            position: 'absolute',
            left: '90%',
            top: '50%',
            marginTop: -12,
            color: Colors.AWAY,
          }}
          size={24}
        />
      )}
    </View>
  );
};

const SfTextInputStyle = {
  alignSelf: 'stretch',
  borderWidth: 1,
  borderRadius: 10,
  padding: 12,
  fontSize: 28,
};

export default SfTextInput;
