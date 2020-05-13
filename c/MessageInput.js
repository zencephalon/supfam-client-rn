import React from 'react';
import { StyleSheet, View } from 'react-native';

import SfTextInput from './SfTextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OPEN } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import { TouchableOpacity } from 'react-native-gesture-handler';

import useLight from '~/h/useLight';
import useProfileMe from '~/h/useProfileMe';

export default function MessageInput({ message, setMessage, submitMessage }) {
  const { backgrounds } = useLight();
  const { profile } = useProfileMe();
  const statusMe = profile?.status;

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
        value={message}
        onChangeText={setMessage}
        textInputStyle={styles.statusInput}
        style={{ flexGrow: 1, flexShrink: 1 }}
        multiline={true}
        blurOnSubmit={false}
      />
      <TouchableOpacity
        onPress={() => submitMessage(message)}
        style={{
          alignSelf: 'flex-start',
          marginLeft: 4,
        }}
      >
        <MaterialCommunityIcons
          name="send"
          size={24}
          color={statusColors[statusMe?.color] || OPEN}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  statusInput: {
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 0,
    paddingBottom: 4,
  },
});
