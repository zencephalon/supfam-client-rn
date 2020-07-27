import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SfTextInput from './SfTextInput';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { OPEN } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { ProfileIconFromProfile } from '~/c/ProfileIcon';

import { queryCache } from 'react-query';
import { putStatusMe } from '~/apis/api';

import { StatusMessageText } from '~/c/StatusMessageText';

function MagicInput({ statusMessage, statusColor, updatedAt, profileId }) {
  const [focused, setFocused] = React.useState(false);
  const [message, setMessage] = React.useState(statusMessage);

  const postMessage = usePostMessage(message, profileId, setMessage);

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {!focused && (
        <StatusMessageText
          updatedAt={updatedAt}
          statusMessage={statusMessage}
        />
      )}
      {!focused && (
        <TouchableOpacity
          onPress={() => {
            if (message === statusMessage) {
              setMessage('');
            }
            setFocused(true);
          }}
          onLongPress={() => {
            setMessage(statusMessage);
            setFocused(true);
          }}
          style={{
            justifyContent: 'flex-end',
            flexGrow: 1,
            flexShrink: 1,
            flexWrap: 'wrap',
            marginTop: 4,
            flexDirection: 'row',
          }}
        >
          <Entypo
            name="new-message"
            size={24}
            color={statusColors[statusColor] || OPEN}
          />
        </TouchableOpacity>
      )}

      {focused && (
        <SfTextInput
          value={message}
          autoFocus={true}
          onChangeText={setMessage}
          // onSubmitEditing={postMessage}
          textInputStyle={styles.statusInput}
          style={{ flexGrow: 1, flexShrink: 1 }}
          multiline={true}
          onBlur={() => setFocused(false)}
          selectTextOnFocus={true}
        />
      )}
      {focused && !!message && (
        <TouchableOpacity
          onPress={() => {
            postMessage();
            setFocused(false);
          }}
          style={{
            marginLeft: 4,
            marginBottom: 2,
            justifyContent: 'flex-end',
            flexGrow: 1,
          }}
        >
          <MaterialCommunityIcons
            name="send"
            size={24}
            color={statusColors[statusColor] || OPEN}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

function usePostMessage(message, profileId, setMessage) {
  return React.useCallback(async () => {
    try {
      await putStatusMe({ profileId, message });
      queryCache.invalidateQueries(['profileMe', profileId]);
    } catch (e) {
      console.log(e);
    }
    setMessage(message);
  }, [message, profileId, setMessage]);
}

export default function StatusInput({ profile, statusMe }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 8,
        alignItems: 'flex-start',
      }}
    >
      <TouchableHighlight
        style={{
          height: '100%',
          flexDirection: 'column',
          marginBottom: 4,
        }}
        onPress={() => {
          navigation.navigate('Profile Settings');
        }}
      >
        <ProfileIconFromProfile profile={profile} size={48} />
      </TouchableHighlight>
      <MagicInput
        statusMessage={statusMe?.message}
        statusColor={statusMe?.color}
        updatedAt={statusMe?.updated_at}
        profileId={profile.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusInput: {
    fontSize: 24,
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
