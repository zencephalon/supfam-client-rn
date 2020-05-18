import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import SfTextInput from './SfTextInput';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { OPEN } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import { TouchableOpacity } from 'react-native-gesture-handler';

import sendInstant from '~/lib/sendInstant';
import useLight from '~/h/useLight';
import useProfileMe from '~/h/useProfileMe';
import useSubmitMessage from '~/h/useSubmitMessage';
import useSnapImage from '~/h/useSnapImage';
import usePickImage from '~/h/usePickImage';
import useSubmitImageMessage from '~/h/useSubmitImageMessage';

export default function MessageInput({ conversationId }) {
  const { backgrounds } = useLight();
  const { profile } = useProfileMe();
  const statusMe = profile?.status;

  const [text, setText] = React.useState('');

  const [image, setImage] = React.useState(null);
  const snapImage = useSnapImage({ setImage });
  const pickImage = usePickImage({ setImage });

  const [focused, setFocused] = React.useState(false);
  const submitMessage = useSubmitMessage(conversationId, profile.id);
  const submitImageMessage = useSubmitImageMessage(conversationId, profile.id);

  const setMessage = React.useCallback(
    (text) => {
      setText(text);
      sendInstant(conversationId, text);
    },
    [conversationId]
  );

  useEffect(() => {
    console.log('image selected', image);
    if (image?.uri) {
      submitImageMessage(image.uri);
    }
  }, [image]);

  return (
    <View
      style={{
        ...styles.container,
        borderTopColor: backgrounds[1],
      }}
    >
      {!focused && (
        <TouchableOpacity
          onPress={snapImage}
          style={{
            alignSelf: 'flex-start',
            paddingRight: 8,
          }}
        >
          <Ionicons name="md-camera" size={32} color={backgrounds[3]} />
        </TouchableOpacity>
      )}
      {!focused && (
        <TouchableOpacity
          onPress={pickImage}
          style={{
            alignSelf: 'flex-start',
            paddingRight: 8,
          }}
        >
          <Ionicons name="md-photos" size={32} color={backgrounds[3]} />
        </TouchableOpacity>
      )}
      <SfTextInput
        placeholder="New message..."
        value={text}
        onChangeText={setMessage}
        textInputStyle={styles.statusInput}
        style={{ flexGrow: 1, flexShrink: 1 }}
        multiline={true}
        blurOnSubmit={false}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {!!text && (
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
      )}
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
  container: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
    marginTop: 4,
    borderTopWidth: 1,
    paddingTop: 8,
    alignItems: 'flex-end',
  },
});
