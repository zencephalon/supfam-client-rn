import * as React from 'react';

import UserIcon from './UserIcon';
import TopText from './TopText';

import { View, Text } from 'react-native';

import TimeAgo from '~/components/TimeAgo';

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { textSecondary, textTertiary, textPrimary } from '~/constants/Colors';

import statusColors from '~/constants/statusColors';

export default function UserStatus({ user }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderLeftColor: statusColors[user.current_status.color],
        borderLeftWidth: 6,
        paddingLeft: 6,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomColor: '#D8DEE9',
        borderBottomWidth: 1,
        paddingRight: 6,
        paddingLeft: 6,
      }}
    >
      {/* <StatusStripe statusColor={user.current_status.color} /> */}
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={user.name}
          locationState={user.name}
          lastUpdate={user.current_status.updated_at}
        />
        <View style={{ flexDirection: 'row', marginTop: 6, flex: 1 }}>
          <View style={{ flexDirection: 'column' }}>
            <UserIcon uri={user.avatar_url} />
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <MaterialCommunityIcons
                style={{ marginRight: -2 }}
                name="battery-40"
                size={14}
                color="#BBB"
              />
              <MaterialCommunityIcons
                name="wifi-strength-2"
                size={14}
                color="#BBB"
              />
            </View>
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
