import React from 'react';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';
import GroupMemberNameSummary from '~/c/GroupMemberNameSummary';

import useLight from '~/h/useLight';

export default function GroupConversationTopBar({ conversation, navigation }) {
  const { foregrounds } = useLight();
  return (
    <SfTopBar style={{ justifyContent: 'space-between' }}>
      <TouchableOpacity
        style={{ paddingTop: 4, paddingBottom: 4, paddingRight: 24 }}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="ios-arrow-back" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
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
            {conversation?.name ? (
              conversation.name
            ) : (
              <GroupMemberNameSummary
                memberProfileIds={conversation?.member_profile_ids}
                maxNames={4}
              />
            )}
          </SfText>
        }
      </View>
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() =>
          navigation.navigate('Group Settings', {
            conversationId: conversation.id,
          })
        }
      >
        <MaterialIcons name="settings" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
    </SfTopBar>
  );
}
