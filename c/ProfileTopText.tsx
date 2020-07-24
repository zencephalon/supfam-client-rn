import * as React from 'react';

import TimeAgoOnline from '~/c/TimeAgoOnline';

import { View } from 'react-native';

import BatteryStatus from '~/c/BatteryStatus';
import NetworkStatus from '~/c/NetworkStatus';
import TopText from '~/c/TopText';

import useCachedProfile from '~/h/useCachedProfile';

function ProfileTopText({ profileId }: { profileId: number }) {
  const profile = useCachedProfile(profileId);

  if (!profile) {
    return null;
  }

  const displayName = profile.name;
  const lastSeen = profile.seen?.updated_at;

  const rightSection = (
    <View
      style={{
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TimeAgoOnline time={lastSeen} />
      <NetworkStatus
        networkType={profile.seen?.network_type}
        networkStrength={profile.seen?.network_strength}
        cellularGeneration={profile.seen?.cellular_generation}
      />
      <BatteryStatus
        battery={profile.seen?.battery}
        batteryState={profile.seen?.battery_state}
      />
    </View>
  );

  return <TopText title={displayName} rightSection={rightSection} />;
}

export default React.memo(ProfileTopText);
