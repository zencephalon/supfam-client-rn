import * as React from 'react';
import { View } from 'react-native';

import SfText from '~/c/SfText';

import {nord10} from '~/constants/Colors';

const EmptyListPlaceholder = ({show, text}) => {
  console.log(" displayed", show, text);
  return(
    <View style={{
      position: 'absolute',
      top: '40%',
      width: '100%',
      display: `${show ? 'normal' : 'none'}`,
      alignItems: 'center',
    }}>
      <SfText
        style={{
          fontSize: 20,
          textAlign: 'center',
          width: '80%',
          color: nord10,
        }}
      >
        {text}
      </SfText>
    </View>
  )
}

export default EmptyListPlaceholder;