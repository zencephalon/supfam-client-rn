import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { showMessage } from 'react-native-flash-message';

import ProfileIcon from '~/c/ProfileIcon';
import TopText from '~/c/TopText';
import SfText from '~/c/SfText';
import DirectConversationPreview from '~/c/DirectConversationPreview';

import statusColors from '~/constants/statusColors';
import { isRecent, statusOpacity } from '~/lib/clockwork';

import useOpenReplyModal from '~/h/useOpenReplyModal';

export default function ProfileStatus({ profile }) {
  const navigation = useNavigation();

  let recentUpdate = isRecent(profile.status.updated_at);
  let opacity = statusOpacity(profile.status.updated_at);

  const statusMessage = profile?.status?.message;

  const openReplyModal = useOpenReplyModal(
    profile.id,
    statusMessage,
    'status',
    null
  );

  const { showActionSheetWithOptions } = useActionSheet();
  const openActionSheet = React.useCallback(() => {
    const options = ['Copy', 'Reply', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(statusMessage);
            showMessage({
              message: 'Copied to clipboard!',
              type: 'info',
            });
            break;
          case 1:
            openReplyModal();
            break;
          default:
            break;
        }
      }
    );
  }, [statusMessage, openReplyModal]);

  return (
    <TouchableOpacity
      style={{
        ...styles.profileStatus,
        borderLeftColor: statusColors[profile?.status?.color],
      }}
      onPress={() => {
        navigation.navigate('Conversation', {
          profileId: profile.id,
        });
      }}
      onLongPress={openActionSheet}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={profile.name}
          locationState={profile.name}
          lastUpdate={profile?.status?.updated_at}
          lastSeen={profile?.seen?.updated_at}
          profile={profile}
        />
        <View style={{ flexDirection: 'row', marginTop: 4, flex: 1 }}>
          <ProfileIcon profileId={profile.id} size={48} />
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
                opacity: opacity,
                fontWeight: recentUpdate ? 'bold' : 'normal',
              }}
            >
              {statusMessage}
            </SfText>
            <DirectConversationPreview userId={profile?.user_id} />
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
    // borderLeftWidth: 4,
    paddingLeft: 8,
    // borderBottomWidth: 1,
    paddingRight: 8,
    paddingLeft: 8,
    marginBottom: 12,
  },
});
