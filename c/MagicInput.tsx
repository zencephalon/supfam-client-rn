import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { queryCache } from 'react-query';
import { putStatusMe } from '~/apis/api';

import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { OPEN } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import { StatusMessageText } from '~/c/StatusMessageText';
import SfTextInput from '~/c/SfTextInput';

import useApi from '~/h/useApi';

function usePostMessage(
  message: string,
  profileId: number,
  setMessage: (message: string) => void
) {
  const PutStatusMe = useApi(putStatusMe);
  return {
    call: React.useCallback(async () => {
      try {
        await PutStatusMe.call({ profileId, message });
        queryCache.invalidateQueries(['profileMe', profileId]);
      } catch (e) {
        console.log(e);
      }
      setMessage(message);
    }, [message, profileId, setMessage, PutStatusMe]),
    req: PutStatusMe.req,
  };
}

function MagicInput({
  statusMessage,
  statusColor,
  updatedAt,
  profileId,
}: {
  statusMessage: string;
  statusColor: number;
  updatedAt: string;
  profileId: number;
}) {
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
      {!focused && !postMessage.req.requested && (
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
      {postMessage.req.requested && <ActivityIndicator size="small" />}

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
            postMessage.call();
            setFocused(false);
          }}
          style={styles.sendButton}
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

export default React.memo(MagicInput);

const styles = StyleSheet.create({
  sendButton: {
    marginLeft: 4,
    marginBottom: 2,
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
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
