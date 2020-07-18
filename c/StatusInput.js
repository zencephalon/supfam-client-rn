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

function MagicInput({
  value,
  onChangeText,
  statusMessage,
  postMessage,
  statusColor,
}) {
  const [focused, setFocused] = React.useState(false);
  const { foregrounds, backgrounds } = useLight();

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
          <SfText
            onPress={() => setFocused(true)}
            // numberOfLines={1}
            style={{ color: foregrounds[1], fontSize: 16 }}
          >
            {statusMessage || 'Loading...'}
          </SfText>
        </View>
      )}
      {focused && (
        <SfTextInput
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
      {!!value && (
        <TouchableOpacity
          onPress={() => {
            postMessage();
            setFocused(false);
          }}
          style={{
            marginLeft: 4,
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
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 8,
        alignItems: 'flex-end',
      }}
    >
      <View
        style={{
          height: '100%',
          flexDirection: 'column-reverse',
          marginBottom: 4,
        }}
      >
        <ProfileIconFromProfile profile={profile} size={48} />
      </View>
      <MagicInput
        value={message}
        onChangeText={setMessage}
        statusMessage={statusMe?.message}
        postMessage={postMessage}
        statusColor={statusMe?.color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusInput: {
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
