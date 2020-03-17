import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import statusColors from '~/constants/statusColors';

const colorLabels = ['Away', 'Busy', 'Free', 'Open'];

const StatusButton = ({ color, setColor }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.statusButton,
        backgroundColor: statusColors[color],
      }}
      onPress={() => setColor(color)}
    >
      <Text>{colorLabels[color]}</Text>
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
