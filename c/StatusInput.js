import React from 'react';
import { StyleSheet, View } from 'react-native';

import SfTextInput from './SfTextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OPEN } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { ProfileIconFromProfile } from '~/c/ProfileIcon';

import useLight from '~/h/useLight';

export default function StatusInput({
  profile,
  statusMe,
  message,
  setMessage,
  postMessage,
}) {
  const { backgrounds } = useLight();

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
      <ProfileIconFromProfile profile={profile} size={48} />
      <SfTextInput
        placeholder={statusMe?.message || 'Loading...'}
        value={message}
        onChangeText={setMessage}
        // onSubmitEditing={postMessage}
        textInputStyle={styles.statusInput}
        style={{ flexGrow: 1, flexShrink: 1 }}
        multiline={true}
      />
      {!!message && (
        <TouchableOpacity
          onPress={postMessage}
          style={{
            alignSelf: 'flex-start',
            marginLeft: 4,
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
    marginLeft: 8,
  },
});
