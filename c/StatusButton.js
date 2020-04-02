import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import statusColors from '~/constants/statusColors';

import SfText from '~/c/SfText';

const colorLabels = ['Away', 'Busy', 'Free', 'Open'];

import useLight from '~/hooks/useLight';

const StatusButton = ({ color, setColor, selected }) => {
  const { foregrounds, backgrounds } = useLight();
  return (
    <TouchableOpacity
      style={{
        ...styles.statusButton,
        backgroundColor: statusColors[color],
      }}
      onPress={() => setColor(color)}
    >
      <SfText
        style={{
          fontWeight: selected ? '700' : '400',
          fontSize: 14,
          color: selected ? backgrounds[0] : foregrounds[0],
        }}
      >
        {colorLabels[color]}
      </SfText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statusButton: {
    padding: 10,
    flexGrow: 1,
    alignItems: 'center',
  },
});

export default StatusButton;
