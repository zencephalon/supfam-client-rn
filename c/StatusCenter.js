import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatusButton from '~/c/StatusButton';
import StatusInput from '~/c/StatusInput';

import { putStatusMe } from '~/apis/api';
import { queryCache } from 'react-query';

import useProfileId from '~/h/useProfileId';
import useProfileMe from '~/h/useProfileMe';

const StatusCenter = () => {
  const [message, setMessage] = React.useState('');

  const profileId = useProfileId();
  const { profile, status } = useProfileMe();

  const statusMe = profile?.status;

  const setColor = React.useCallback(
    async (color) => {
      try {
        await putStatusMe({ profileId, color });
        queryCache.refetchQueries(['profileMe', profileId]);
      } catch (e) {
        console.log(e);
      }
    },
    [profileId]
  );

  const postMessage = React.useCallback(async () => {
    if (status === 'success') {
      try {
        await putStatusMe({ profileId, color: statusMe?.color, message });
        queryCache.refetchQueries(['profileMe', profileId]);
      } catch (e) {
        console.log(e);
      }
      setMessage('');
    }
  }, [statusMe, message, statusMe, profileId]);

  return (
    <React.Fragment>
      <StatusInput
        profile={profile}
        statusMe={statusMe}
        message={message}
        setMessage={setMessage}
        postMessage={postMessage}
      />
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
    </React.Fragment>
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
