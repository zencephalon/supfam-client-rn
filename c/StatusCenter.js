import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatusButton from '~/c/StatusButton';
import StatusInput from '~/c/StatusInput';

import useProfileId from '~/h/useProfileId';
import useProfileMe from '~/h/useProfileMe';
import useLight from '~/h/useLight';
import useSetColor from '~/h/useSetColor';

const StatusCenter = () => {
  const { backgrounds, light } = useLight();

  const profileId = useProfileId();
  const { profile } = useProfileMe();

  const statusMe = profile?.status;

  const setColor = useSetColor(profileId);

  return (
    <View
      style={{
        backgroundColor: backgrounds[0],
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: light ? 0.1 : 0.4,
        shadowRadius: 1,
      }}
    >
      {profile?.id && <StatusInput profile={profile} statusMe={statusMe} />}
      <View style={styles.tabBarInfoContainer}>
        {[0, 1, 2, 3].map((color) => {
          return (
            <StatusButton
              color={color}
              setColor={setColor}
              key={`${color}`}
              selected={statusMe?.color === color}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
  },
  tabBarInfoContainer: {
    alignItems: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default StatusCenter;
