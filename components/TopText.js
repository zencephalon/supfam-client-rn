import * as React from 'react';

import TimeAgo from '~/components/TimeAgo';
import TimeAgoOnline from '~/components/TimeAgoOnline';

import { View, Text } from 'react-native';

import { textSecondary, textTertiary } from '~/constants/Colors';

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import BatteryStatus from '~/components/BatteryStatus';
import NetworkStatus from '~/components/NetworkStatus';

export default function TopText({
  displayName,
  locationState,
  lastUpdate,
  lastSeen,
  user,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            color: textSecondary,
            fontWeight: '500',
          }}
        >
          {displayName}
        </Text>
        <TimeAgoOnline time={lastSeen} />
        <BatteryStatus
          battery={user?.current_seen?.battery}
          batteryState={user?.current_seen?.battery_state}
        />
        <NetworkStatus
          networkType={user?.current_seen?.network_type}
          networkStrength={user?.current_seen?.network_strength}
          cellularGeneration={user?.current_seen?.cellular_generation}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            textAlign: 'right',
            color: textTertiary,
            alignSelf: 'flex-end',
            fontSize: 14,
          }}
        >
          <TimeAgo time={lastUpdate} suffix="ago" />
        </Text>
        <FontAwesome
          style={{
            textAlign: 'right',
            marginLeft: 3,
            alignSelf: 'flex-end',
          }}
          name="pencil-square-o"
          size={14}
          color={textTertiary}
        />
      </View>
    </View>
  );
}
