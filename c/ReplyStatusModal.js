import * as React from 'react';

import { StyleSheet, Text } from 'react-native';

import SfModal from '~/c/SfModal';
import SfButton from '~/c/SfButton';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';

import useProfileDmConversation from '~/h/useProfileDmConversation';
import useProfileId from '~h/useProfileId';
import useCachedProfile from '~/h/useCachedProfile';
import useApi from '~h/useApi';
import useSubmitMessage from '~/h/useSubmitMessage';
import { sendMessage } from '~/apis/api';

export default function ReplyStatusModal({ navigation, route }) {
  const [reply, setReply] = React.useState('');

  const meProfileId = useProfileId();
  const { profileId } = route.params;
  const profile = useCachedProfile(profileId);

  const Send = useApi(sendMessage);

  const { conversation } = useProfileDmConversation(profileId);
  const submitMessage = useSubmitMessage(conversation?.id, meProfileId);

  const quoted = profile?.status.message;

  const submit = () => {
    submitMessage({
      message: reply,
      data: { quoted, profile_id: profileId, quote_type: 'status' },
      type: 2,
    });
    navigation.pop();
  };

  return (
    <SfModal>
      <>
        <SfText style={styles.modalText}>
          Replying to {profile.name}&apos;s status: &quot;{quoted}&quot;
        </SfText>

        <SfTextInput
          value={reply}
          autoFocus={true}
          onChangeText={setReply}
          textInputStyle={styles.statusInput}
          // style={{ flexGrow: 1, flexShrink: 1 }}
          multiline={true}
          onBlur={() => {}}
        />

        <SfButton
          title="Submit"
          onPress={submit}
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
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  statusInput: {
    minWidth: '100%',
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
