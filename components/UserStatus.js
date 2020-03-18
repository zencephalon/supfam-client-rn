import * as React from 'react';

import UserIcon from './UserIcon';
import TopText from './TopText';

import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { textPrimary } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import BatteryStatus from '~/components/BatteryStatus';

export default function UserStatus({ user }) {
  return (
    <View
      style={{
        ...styles.userStatus,
        borderLeftColor: statusColors[user.current_status.color],
      }}
    >
      {/* <StatusStripe statusColor={user.current_status.color} /> */}
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={user.name}
          locationState={user.name}
          lastUpdate={user?.current_status?.updated_at}
          lastSeen={user?.current_seen?.updated_at}
          user={user}
        />
        <View style={{ flexDirection: 'row', marginTop: 6, flex: 1 }}>
          <View style={{ flexDirection: 'column' }}>
            <UserIcon uri={user.avatar_url} />
            <View style={{ flexDirection: 'row', marginTop: 3 }}></View>
          </View>
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
    </View>
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
    borderBottomColor: '#D8DEE9',
    borderBottomWidth: 1,
    paddingRight: 6,
    paddingLeft: 6,
  },
});
