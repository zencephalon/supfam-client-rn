import * as React from 'react';

import {Alert, Modal, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

export default function SfModal({visible, setVisible, children}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(false);
      }}
    >
      <TouchableOpacity 
        style={styles.centeredView} 
        activeOpacity={1} 
        onPressOut={() => setVisible(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center"
  }
});
