import * as React from 'react';

import {
  Alert,
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import useLight from '~/h/useLight';
import { useNavigation } from '@react-navigation/native';

export default function SfModal({ children }) {
  const { backgrounds } = useLight();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.modalBackground}
      activeOpacity={1}
      onPressOut={() => navigation.pop()}
    >
      <KeyboardAvoidingView
        style={styles.centeredView}
        {...(Platform.OS === 'ios' && { behavior: 'padding' })}
      >
        <TouchableWithoutFeedback>
          <View style={[styles.modalView, { backgroundColor: backgrounds[0] }]}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});
