import React from 'react';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';
import useGoHome from '~/h/useGoHome';
import useGoFriendSettings from '~/h/useGoFriendSettings';

import ProfileIcon from '~/c/ProfileIcon';

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

  const goHome = useGoHome();
  const goToProfile = useGoFriendSettings(profileId);

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
      <TouchableOpacity style={styles.backButton} onPress={goHome}>
        <Ionicons name="ios-arrow-back" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.statusContainer} onPress={goToProfile}>
        <ProfileIcon profileId={profileId} />
        <View>
          <SfText style={nameStyle}>{name}</SfText>
          <SfText style={statusStyle} numberOfLines={1}>
            {statusMessage}
          </SfText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settings} onPress={goToProfile}>
        <MaterialIcons name="settings" size={24} color={foregrounds[1]} />
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
  backButton: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 24,
  },
});

export default React.memo(ConversationTopBar);
