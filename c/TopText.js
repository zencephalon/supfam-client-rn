import * as React from 'react';

import TimeAgo from '~/c/TimeAgo';
import TimeAgoOnline from '~/c/TimeAgoOnline';

import { View, Text } from 'react-native';

import { textSecondary, textTertiary } from '~/constants/Colors';

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import BatteryStatus from '~/c/BatteryStatus';
import NetworkStatus from '~/c/NetworkStatus';

import useLight from '~/hooks/useLight';

export default function TopText({
  displayName,
  locationState,
  lastUpdate,
  lastSeen,
  user,
}) {
  const { foregrounds } = useLight();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: foregrounds[1],
            fontWeight: '500',
          }}
        >
          {displayName}
        </Text>
        <TimeAgoOnline time={lastSeen} />
        <BatteryStatus
          battery={user?.seen?.battery}
          batteryState={user?.seen?.battery_state}
        />
        <NetworkStatus
          networkType={user?.seen?.network_type}
          networkStrength={user?.seen?.network_strength}
          cellularGeneration={user?.seen?.cellular_generation}
        />
      </View>

      {/* <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            textAlign: 'right',
            color: foregrounds[3],
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
          color={foregrounds[3]}
        />
      </View> */}
    </View>
  );
}
