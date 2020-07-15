import * as React from 'react';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
import { OPEN } from '~/constants/Colors';

export default function ReplyStatusModal({ navigation, route }) {
  const [reply, setReply] = React.useState('');

  const meProfileId = useProfileId();
  const { profileId, quoted, conversationId, quoteType } = route.params;
  const profile = useCachedProfile(profileId);

  const { conversation } = useProfileDmConversation(profileId);
  // If we're already in a conversation just use the conversationId passed, it might be a group
  const submitMessage = useSubmitMessage(
    conversationId || conversation?.id,
    meProfileId
  );

  const submit = () => {
    submitMessage({
      message: reply,
      data: { quoted, profile_id: profileId, quote_type: quoteType },
      type: 2,
    });
    navigation.pop();
  };

  return (
    <SfModal>
      <>
        <SfText style={styles.modalText}>
          Replying to {profile.name}&apos;s {quoteType}: &quot;{quoted}&quot;
        </SfText>

        <View style={{ flexDirection: 'row', width: '80%' }}>
          <SfTextInput
            value={reply}
            autoFocus={true}
            onChangeText={setReply}
            textInputStyle={styles.statusInput}
            multiline={true}
          />
          {!!reply && (
            <TouchableOpacity
              onPress={submit}
              style={{
                alignSelf: 'flex-start',
                paddingLeft: 4,
              }}
            >
              <MaterialCommunityIcons name="send" size={32} color={OPEN} />
            </TouchableOpacity>
          )}
        </View>
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
    flexShrink: 1,
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
