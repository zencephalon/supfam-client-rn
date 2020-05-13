import React from 'react';
import { StyleSheet, View } from 'react-native';

import SfTextInput from './SfTextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OPEN } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import { TouchableOpacity } from 'react-native-gesture-handler';

import useLight from '~/h/useLight';
import useProfileMe from '~/h/useProfileMe';
import useSubmitMessage from '~/h/useSubmitMessage';
import sendInstant from '~/lib/sendInstant';

export default function MessageInput({ conversationId }) {
  const { backgrounds } = useLight();
  const { profile } = useProfileMe();
  const statusMe = profile?.status;

  const [text, setText] = React.useState('');
  const submitMessage = useSubmitMessage(conversationId, profile.id);

  const setMessage = React.useCallback(
    (text) => {
      setText(text);
      sendInstant(conversationId, text);
    },
    [conversationId]
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 8,
        borderTopColor: backgrounds[1],
        borderTopWidth: 1,
        paddingTop: 8,
        alignItems: 'flex-end',
      }}
    >
      <SfTextInput
        value={text}
        onChangeText={setMessage}
        textInputStyle={styles.statusInput}
        style={{ flexGrow: 1, flexShrink: 1 }}
        multiline={true}
        blurOnSubmit={false}
      />
      <TouchableOpacity
        onPress={() => {
          setMessage('');
          submitMessage(text);
        }}
        style={{
          alignSelf: 'flex-start',
          paddingLeft: 4,
        }}
      >
        <MaterialCommunityIcons
          name="send"
          size={32}
          color={statusColors[statusMe?.color] || OPEN}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  statusInput: {
    padding: 12,
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 0,
    paddingBottom: 4,
  },
});
