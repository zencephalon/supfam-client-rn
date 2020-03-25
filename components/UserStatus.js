import * as React from 'react';

import UserIcon from './UserIcon';
import TopText from './TopText';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { textPrimary, nord4 } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

export default function UserStatus({ user, navigation }) {
  return (
    <TouchableOpacity
      style={{
        ...styles.userStatus,
        borderLeftColor: statusColors[user.current_status.color],
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
        <View style={{ flexDirection: 'row', marginTop: 6, flex: 1 }}>
          <UserIcon uri={user.avatar_url} />
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: textPrimary,
                flexGrow: 1,
                flexShrink: 1,
              }}
            >
              {user.current_status.message}
            </Text>

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
    borderLeftWidth: 6,
    paddingLeft: 6,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomColor: nord4,
    borderBottomWidth: 1,
    paddingRight: 6,
    paddingLeft: 6,
  },
});
