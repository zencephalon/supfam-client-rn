import * as React from 'react';

import { StyleSheet, Text } from 'react-native';

import SfModal from '~/c/SfModal';
import SfButton from '~/c/SfButton';
import SfTextButton from '~/c/SfTextButton';
import SfText from '~/c/SfText';

export default function AddChoiceModal({ visible, setVisible, navigation }) {
  return (
    <SfModal visible={visible} setVisible={setVisible}>
      <>
        <SfText style={styles.modalText}>What would you like to do?</SfText>

        <SfButton
          title="Invite Friends"
          onPress={() => {
            navigation.navigate('Invite');
            setVisible(false);
          }}
          style={{
            marginTop: 16,
            paddingLeft: 24,
            paddingRight: 24,
          }}
          buttonTextStyle={{
            fontSize: 14,
          }}
        />
        <SfButton
          title="Create Group"
          onPress={() => {
            navigation.navigate('New Group', { conversationId: null });
            setVisible(false);
          }}
          style={{
            marginTop: 16,
            paddingLeft: 24,
            paddingRight: 24,
          }}
          buttonTextStyle={{
            fontSize: 14,
          }}
        />
        <SfTextButton
          title="cancel"
          onPress={() => setVisible(false)}
          style={{
            marginTop: 16,
          }}
          buttonTextStyle={{
            fontSize: 14,
          }}
        />
      </>
    </SfModal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});
