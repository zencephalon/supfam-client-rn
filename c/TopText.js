import * as React from 'react';

// import TimeAgo from '~/c/TimeAgo';
import TimeAgoOnline from '~/c/TimeAgoOnline';

import { View, Text } from 'react-native';

// import { textSecondary, textTertiary } from '~/constants/Colors';

// import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import BatteryStatus from '~/c/BatteryStatus';
import NetworkStatus from '~/c/NetworkStatus';

import useLight from '~/h/useLight';

export default function TopText({
  displayName,
  locationState,
  lastUpdate,
  lastSeen,
  profile,
  hideRightSection,
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
      </View>
      {
        !hideRightSection ?
        <View
          style={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TimeAgoOnline time={lastSeen} />
          <NetworkStatus
            networkType={profile?.seen?.network_type}
            networkStrength={profile?.seen?.network_strength}
            cellularGeneration={profile?.seen?.cellular_generation}
          />
          <BatteryStatus
            battery={profile?.seen?.battery}
            batteryState={profile?.seen?.battery_state}
          />
        </View> : null
      }
    </View>
  );
}
