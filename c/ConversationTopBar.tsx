import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';
import useGoFriendSettings from '~/h/useGoFriendSettings';
import useCachedProfile from '~/h/useCachedProfile';
import callPhone from '~/lib/callPhone';

import ProfileIcon from '~/c/ProfileIcon';
import TopBarBackButton from '~/c/TopBarBackButton';

function ConversationTopBar({
  profileId,
  name,
  statusMessage,
}: {
  profileId: number;
  name: string;
  statusMessage: string;
}) {
  const { foregrounds } = useLight();

  const goToProfile = useGoFriendSettings(profileId);
  const profile = useCachedProfile(profileId);

  const statusStyle = React.useMemo(
    () => ({
      fontSize: 12,
      marginLeft: 8,
      color: foregrounds[1],
      overflow: 'hidden',
    }),
    [foregrounds[1]]
  );
  const nameStyle = React.useMemo(
    () => ({
      fontSize: 16,
      marginLeft: 8,
      color: foregrounds[1],
    }),
    [foregrounds[1]]
  );

  return (
    <SfTopBar style={{ justifyContent: 'space-between' }}>
      <TopBarBackButton />
      <TouchableOpacity style={styles.statusContainer} onPress={goToProfile}>
        <ProfileIcon profileId={profileId} />
        <View>
          <SfText style={nameStyle}>{name}</SfText>
          <SfText style={statusStyle} numberOfLines={1}>
            {statusMessage}
          </SfText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settings}
        onPress={() => callPhone(profile.phone)}
      >
        <MaterialIcons name="phone" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
    </SfTopBar>
  );
}

const styles = StyleSheet.create({
  settings: {
    padding: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: '60%',
  },
});

export default React.memo(ConversationTopBar);
