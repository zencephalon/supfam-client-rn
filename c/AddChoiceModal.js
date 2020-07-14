import * as React from 'react';

import {StyleSheet, Text} from 'react-native';

import SfModal from '~/c/SfModal';
import SfButton from '~/c/SfButton';
import SfTextButton from '~/c/SfTextButton';

export default function AddChoiceModal({visible, setVisible, navigation}) {
  return (
    <SfModal visible={visible} setVisible={setVisible}>
      <>
        <Text style={styles.modalText}>What would you like to do?</Text>

        <SfButton
          title='Invite Friend(s)'
          onPress={() => {
            navigation.navigate('Invite');
            setVisible(false);
          }}
          style={{
            marginTop: 16,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        />
        <SfButton
          title='Create Group'
          onPress={() => {
            navigation.navigate('New Group', { conversationId: null });
            setVisible(false);
          }}
          style={{
            marginTop: 16,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        />
        <SfTextButton
          title='cancel'
          onPress={() => setVisible(false)}
          style={{
            marginTop: 16,
          }}
        />
      </>
    </SfModal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center"
  }
});
