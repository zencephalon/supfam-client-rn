import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';

import useLight from '~/h/useLight';
import useGoBack from '~/h/useGoBack'

export default function SettingsTopBar() {
  const navigation = useNavigation();

  const { foregrounds } = useLight();
  const goBack = useGoBack();
  return (
      <TouchableOpacity
        style={styles.button}
        onPress={goBack}
      >
        <MaterialIcons name="keyboard-arrow-left" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4
  }
})