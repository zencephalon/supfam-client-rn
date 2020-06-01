import * as React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

import SfText from '~/c/SfText';

import statusColors from '~/constants/statusColors';

import useLight from '~/h/useLight';

import { useNavigation } from '@react-navigation/native';

export default function ProfileStatus({ chat }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        ...styles.profileStatus,
        // borderBottomColor: backgrounds[1],
      }}
      onPress={() => {
        navigation.navigate('Conversation', { conversation: chat });
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <SfText style={{ textAlign: 'center', alignSelf: 'stretch' }}>
          {chat.name}
        </SfText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileStatus: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    // borderLeftWidth: 4,
    paddingLeft: 8,
    // borderBottomWidth: 1,
    paddingRight: 8,
    paddingLeft: 8,
    marginBottom: 8,
  },
});
