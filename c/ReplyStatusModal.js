import * as React from 'react';

import {StyleSheet, Text} from 'react-native';

import SfModal from '~/c/SfModal';
import SfButton from '~/c/SfButton';
import SfTextInput from '~/c/SfTextInput';

import useCachedProfile from '~/h/useCachedProfile';

export default function ReplyStatusModal({navigation, route}) {
  const [value, setValue] = React.useState('');

  const { profileId } = route.params;
  const profile = useCachedProfile(profileId);

  return (
    <SfModal>
      <>
        <Text style={styles.modalText}>Replying to {profile.name}&apos;s status: &quot;{profile?.status.message}&quot;</Text>

        <SfTextInput
          value={value}
          autoFocus={true}
          onChangeText={setValue}
          textInputStyle={styles.statusInput}
          // style={{ flexGrow: 1, flexShrink: 1 }}
          multiline={true}
          onBlur={() => {}}
        />

        <SfButton
          title='Submit'
          onPress={() => {
            navigation.pop();
          }}
          style={{
            marginTop: 16,
            paddingLeft: 24,
            paddingRight: 24,
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
  },
  statusInput: {
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 0,
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 8,
    marginBottom: 4,
  },
});
