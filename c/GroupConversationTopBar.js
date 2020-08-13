import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';
import GroupMemberNameSummary from '~/c/GroupMemberNameSummary';
import TopBarBackButton from '~/c/TopBarBackButton';

import useLight from '~/h/useLight';

export default function GroupConversationTopBar({ conversation, navigation }) {
  const { foregrounds } = useLight();
  return (
    <SfTopBar style={{ justifyContent: 'space-between' }}>
      <TopBarBackButton />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '60%',
          whiteSpace: 'wrap',
        }}
      >
        {
          <SfText
            style={{ fontSize: 16, marginLeft: 8, color: foregrounds[1] }}
          >
            {conversation?.name || (
              <GroupMemberNameSummary conversationId={conversation?.id} />
            )}
          </SfText>
        }
      </View>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() =>
          navigation.navigate('Group Settings', {
            conversationId: conversation?.id,
          })
        }
      >
        <MaterialIcons name="settings" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
    </SfTopBar>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    padding: 4,
    paddingLeft: 24,
  },
});
