import * as React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import TopText from '~/c/GroupConversationTopText';
import GroupConversationPreview from '~/c/GroupConversationPreview';
import GroupMemberNameSummary from '~/c/GroupMemberNameSummary';
import GroupConversationMemberIcons from '~/c/GroupConversationMemberIcons';

import useProfileId from '~h/useProfileId';

import { useLinkTo } from '@react-navigation/native';

function ChatItem({ conversationId }) {
  const userProfileId = useProfileId();
  const linkTo = useLinkTo();

  return (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => {
        linkTo(`/conversation/${conversationId}`);
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText conversationId={conversationId} />
        <View style={{ flexDirection: 'row', marginTop: 4, flex: 1 }}>
          <View style={{ flexDirection: 'row', width: 48, flexWrap: 'wrap' }}>
            <GroupConversationMemberIcons
              conversationId={conversationId}
              userProfileId={userProfileId}
            />
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
              <GroupMemberNameSummary conversationId={conversationId} />
            </SfText>
            <GroupConversationPreview conversationId={conversationId} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ChatItem);

const styles = StyleSheet.create({
  conversationItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 12,
  },
});
