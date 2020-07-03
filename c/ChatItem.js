import * as React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import TopText from '~/c/TopText';
import ProfileIcon from '~/c/ProfileIcon';
import ProfileName from '~/c/ProfileName';
import GroupConversationPreview from '~/c/GroupConversationPreview';

import useProfileId from '~h/useProfileId';

import { useNavigation } from '@react-navigation/native';

const MAX_DISPLAY_MEMBERS = 4;

export default function ChatItem({ chat }) {
  const userProfileId = useProfileId();
  const navigation = useNavigation();

  const renderMemberNamesSummary = (chat) => {
    let filteredMemberIds = chat.member_profile_ids.filter((profileId) => {return profileId != userProfileId});
    const totalMembers = filteredMemberIds.length;
    filteredMemberIds = filteredMemberIds.slice(0, MAX_DISPLAY_MEMBERS);
    return (
      <React.Fragment>
        {
          filteredMemberIds.map((profileId, index) => {
            return (
              <React.Fragment key={profileId}>
                <ProfileName profileId={profileId} style={{fontSize: 18}}/>
                { index < filteredMemberIds.length - 2 || (index < filteredMemberIds.length - 1 && totalMembers > MAX_DISPLAY_MEMBERS) ? <Text>{', '}</Text> : null }
                { index == filteredMemberIds.length - 2 && totalMembers <= MAX_DISPLAY_MEMBERS ? <Text>{' & '}</Text> : null }
                { index == filteredMemberIds.length - 1 && totalMembers > MAX_DISPLAY_MEMBERS ? <Text>{' & others'}</Text> : null }
              </React.Fragment>
            )
          })
        }
      </React.Fragment>
    )
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.profileStatus,
      }}
      onPress={() => {
        navigation.navigate('Conversation', { conversationId: chat.id });
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={chat.name}
          locationState={'blah bluh'}
          hideRightSection
        />
        <View style={{ flexDirection: 'row', marginTop: 4, flex: 1 }}>
          <ProfileIcon profileId={chat.member_profile_ids[0]} size={48} />
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
              alignItems: 'flex-start',
            }}
          >
            <SfText
              style={{
                fontSize: 16,
                flexGrow: 1,
                flexShrink: 1,
                marginLeft: 8,
                overflow: 'hidden',
              }}
            >
              {renderMemberNamesSummary(chat)}
            </SfText>
            <GroupConversationPreview conversationId={chat.id} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileStatus: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
  },
});
