import * as React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import TopText from '~/c/TopText';
import ProfileIcon from '~/c/ProfileIcon';
import GroupConversationPreview from '~/c/GroupConversationPreview';
import GroupMemberNameSummary from '~/c/GroupMemberNameSummary';

import useProfileId from '~h/useProfileId';

import { useNavigation, useLinkTo } from '@react-navigation/native';

export default function ChatItem({ chat }) {
  const userProfileId = useProfileId();
  const navigation = useNavigation();
  const linkTo = useLinkTo();

  const renderMemberNamesSummary = (chat) => {
    return (
      <GroupMemberNameSummary memberProfileIds={chat.member_profile_ids} maxNames={4}/>
    )
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.profileStatus,
      }}
      onPress={() => {
        // navigation.navigate('Group', { conversationId: chat.id });
        linkTo(`/conversation/${chat.id}`);
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={chat.name}
          locationState={'blah bluh'}
          hideRightSection
        />
        <View style={{ flexDirection: 'row', marginTop: 4, flex: 1 }}>
          <View style={{ flexDirection: 'row', width: 48, flexWrap: 'wrap' }}>
            {chat.member_profile_ids
              .filter((pId) => pId !== userProfileId)
              .slice(0, 4)
              .map((profileId) => (
                <ProfileIcon key={profileId} profileId={profileId} size={24} />
              ))}
          </View>
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
