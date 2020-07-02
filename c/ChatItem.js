import * as React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import GroupConversationPreview from '~/c/GroupConversationPreview';

import useLight from '~/h/useLight';

import { useNavigation } from '@react-navigation/native';

export default function ChatItem({ chat }) {
  const { foregrounds } = useLight();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.profileStatus}
      onPress={() => {
        navigation.navigate('Conversation', { conversation: chat });
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <SfText
          style={{
            textAlign: 'left',
            color: foregrounds[1],
          }}
        >
          {chat.name}
        </SfText>
        <GroupConversationPreview conversationId={chat.id} />
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
    marginBottom: 8,
  },
});
