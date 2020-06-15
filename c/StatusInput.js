import React from 'react';
import { StyleSheet, View } from 'react-native';

import SfTextInput from './SfTextInput';
import SfText from './SfText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OPEN } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { ProfileIconFromProfile } from '~/c/ProfileIcon';

import useLight from '~/h/useLight';

function MagicInput({ value, onChangeText, statusMessage }) {
  const [focused, setFocused] = React.useState(false);
  const { backgrounds } = useLight();

  return (
    <>
      {!focused && (
        <View
          style={{
            ...styles.statusInput,
            flexGrow: 1,
            flexShrink: 1,
            backgroundColor: backgrounds[1],
            borderRadius: 10,
          }}
        >
          <SfText onPress={() => setFocused(true)} numberOfLines={1}>
            {statusMessage}
          </SfText>
        </View>
      )}
      {focused && (
        <SfTextInput
          placeholder={focused ? '' : statusMessage || 'Loading...'}
          value={value}
          autoFocus={true}
          onChangeText={onChangeText}
          // onSubmitEditing={postMessage}
          textInputStyle={styles.statusInput}
          style={{ flexGrow: 1, flexShrink: 1 }}
          multiline={true}
          onBlur={() => setFocused(false)}
        />
      )}
    </>
  );
}

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
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: '100%',
          flexDirection: 'column-reverse',
        }}
      >
        <ProfileIconFromProfile profile={profile} size={48} />
      </View>
      <MagicInput
        value={message}
        onChangeText={setMessage}
        statusMessage={statusMe?.message}
      />
      {!!message && (
        <TouchableOpacity
          onPress={postMessage}
          style={{
            marginLeft: 4,
            justifyContent: 'flex-end',
            flexGrow: 1,
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
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 0,
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 8,
  },
});
