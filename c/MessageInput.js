import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';

import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';

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
import useConversationPresence from '~/h/useConversationPresence';

const getProfilesHere = (presence, meProfileId) => {
  return React.useMemo(() => {
    const profilesHere = [];
    _.each(presence, (lastHeartBeat, profileId) => {
      // Yikes, profileId is a string, meProfileId is an int, should probably get typescript going at some point soon
      if (profileId == meProfileId) {
        return;
      }
      if (lastHeartBeat + 5000 > Date.now()) {
        profilesHere.push(profileId);
      }
    });
    return profilesHere;
  }, [presence, meProfileId]);
};

function _ProfilesHereDisplay({ profileIds }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: 8,
        alignSelf: 'flex-start',
      }}
    >
      {profileIds.length === 0 ? null : (
        <React.Fragment>
          {profileIds.map((profileId) => (
            <ProfileIcon key={profileId} profileId={profileId} size={16} />
          ))}
          <SfText style={{ fontSize: 12 }}>⚡</SfText>
        </React.Fragment>
      )}
    </View>
  );
}
const ProfilesHereDisplay = React.memo(_ProfilesHereDisplay);

function MessageInput({ conversationId }) {
  const { backgrounds } = useLight();
  const { profile } = useProfileMe();
  const statusMe = profile?.status;

  const [text, setText] = React.useState('');

  const [image, setImage] = React.useState(null);
  const snapImage = useSnapImage({ setImage });
  const pickImage = usePickImage({ setImage });

  const [focused, setFocused] = React.useState(false);

  const [qid, setQid] = React.useState(Math.random());
  const submitMessage = useSubmitMessage(conversationId, profile?.id);
  const submitImageMessage = useSubmitImageMessage(conversationId, profile?.id);

  const { presence } = useConversationPresence(conversationId, profile?.id);
  const profilesHere = getProfilesHere(presence, profile?.id);
  const anyoneHere = profilesHere.length > 0;

  const setFocusedTrue = React.useCallback(() => setFocused(true), [
    setFocused,
  ]);
  const setFocusedFalse = React.useCallback(() => setFocused(false), [
    setFocused,
  ]);

  const setMessage = React.useCallback(
    (text) => {
      setText(text);
      if (anyoneHere && text !== '') {
        sendInstant(conversationId, text, qid);
      }
    },
    [conversationId, qid, anyoneHere]
  );

  useEffect(() => {
    if (image?.uri) {
      submitImageMessage(image);
    }
  }, [image]);

  return (
    <View
      style={{
        borderTopColor: backgrounds[1],
        borderTopWidth: 1,
        paddingTop: 4,
      }}
    >
      <ProfilesHereDisplay profileIds={profilesHere} />

      <View style={styles.container}>
        {!focused && (
          <TouchableOpacity onPress={snapImage} style={styles.cameraButton}>
            <Ionicons name="md-camera" size={32} color={backgrounds[3]} />
          </TouchableOpacity>
        )}
        {!focused && (
          <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
            <Ionicons name="md-photos" size={32} color={backgrounds[3]} />
          </TouchableOpacity>
        )}
        <SfTextInput
          placeholder="New message..."
          value={text}
          onChangeText={setMessage}
          textInputStyle={styles.statusInput}
          style={styles.statusInputContainer}
          multiline={true}
          blurOnSubmit={false}
          onFocus={setFocusedTrue}
          onBlur={setFocusedFalse}
        />
        {!!text && (
          <TouchableOpacity
            onPress={() => {
              setMessage('');
              submitMessage({
                message: text,
                qid,
                type: 0,
              });
              setQid(Math.random());
            }}
            style={styles.sendButton}
          >
            <MaterialCommunityIcons
              name="send"
              size={24}
              color={statusColors[statusMe?.color] || OPEN}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default React.memo(MessageInput);

const styles = StyleSheet.create({
  cameraButton: {
    alignSelf: 'flex-start',
    paddingRight: 8,
  },
  sendButton: {
    alignSelf: 'flex-start',
    paddingLeft: 4,
  },
  statusInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  statusInput: {
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 0,
    paddingBottom: 4,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
    paddingTop: 4,
    alignItems: 'flex-end',
  },
});
