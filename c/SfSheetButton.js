import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheetButton from '~/c/BottomSheetButton';
import * as Colors from '~/constants/Colors';

import useLight from '~/h/useLight';

const SfSheetButton = (props) => {
  const { title, style, color, buttonTextStyle, ...rest } = props;
  const { light, foregrounds } = useLight();

  const textColor = foregrounds[0];

  const mergedStyle = [styles.sheetButton, style];
  return (
    <BottomSheetButton {...rest} style={mergedStyle}>
      <Text
        style={[
          styles.buttonText,
          {
            color: textColor,
          },
          buttonTextStyle,
        ]}
      >
        {title}
      </Text>
    </BottomSheetButton>
  );
};

export default SfSheetButton;

const styles = StyleSheet.create({
  sheetButton: {
    // marginBottom: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#aaa',
  },
  buttonText: {
    fontSize: 24,
    paddingTop: 16,
    paddingBottom: 16,
    // fontWeight: 'bold',
  },
});
