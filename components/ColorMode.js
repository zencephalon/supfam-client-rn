import React from 'react';
import { useColorScheme } from 'react-native-appearance';

const ColorMode = props => {
  const colorScheme = useColorScheme();

  const { children, ...rest } = props;
  // TODO get these from ~/constants/Colors
  const color = colorScheme === 'dark' ? '#F7F7F7' : '#282C34';
  const backgroundColor = colorScheme === 'dark' ? '#282C34' : '#F7F7F7';
  return children({ ...rest, color, backgroundColor });
};

const withColorMode = Component => {
  return props => {
    return (
      <ColorMode {...props}>{props => <Component {...props} />}</ColorMode>
    );
  };
};

export default withColorMode;
