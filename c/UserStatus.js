import * as React from 'react';

import UserIcon from './UserIcon';
import TopText from './TopText';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';

import { textPrimary, nord4 } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import useLight from '~/hooks/useLight';

export default function UserStatus({ user, navigation }) {
  const { backgrounds } = useLight();
  return (
    <TouchableOpacity
      style={{
        ...styles.userStatus,
        borderLeftColor: statusColors[user.current_status.color],
        // borderBottomColor: backgrounds[1],
      }}
      onPress={() => {
        navigation.navigate('Conversation', { user });
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={user.name}
          locationState={user.name}
          lastUpdate={user?.current_status?.updated_at}
          lastSeen={user?.current_seen?.updated_at}
          user={user}
        />
        <View style={{ flexDirection: 'row', marginTop: 8, flex: 1 }}>
          <UserIcon
            uri={user.avatar_url}
            size={40}
            color={user.current_status.color}
          />
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
            }}
          >
            <SfText
              style={{
                fontSize: 16,
                flexGrow: 1,
                flexShrink: 1,
                backgroundColor: backgrounds[1],
                padding: 8,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {user.current_status.message}
            </SfText>

            <Text style={{ textAlign: 'right', alignSelf: 'stretch' }}>
              {user.messagePreview}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  userStatus: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderLeftWidth: 4,
    paddingLeft: 8,
    paddingTop: 8,
    // borderBottomWidth: 1,
    paddingRight: 8,
    paddingLeft: 8,
  },
});
