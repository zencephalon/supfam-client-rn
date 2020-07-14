import * as React from 'react';

import { StyleSheet, Text } from 'react-native';

import SfModal from '~/c/SfModal';
import SfButton from '~/c/SfButton';
import SfTextButton from '~/c/SfTextButton';
import SfText from '~/c/SfText';

export default function AddChoiceModal({navigation}) {
  return (
    <SfModal>
      <>
        <SfText style={styles.modalText}>What would you like to do?</SfText>

        <SfButton
          title="Invite Friends"
          onPress={() => {
            navigation.navigate('Invite');
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
          title='cancel'
          onPress={() => navigation.pop()}
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
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});
