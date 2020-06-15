import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatusButton from '~/c/StatusButton';
import StatusInput from '~/c/StatusInput';

import { putStatusMe } from '~/apis/api';
import { queryCache } from 'react-query';

import useProfileId from '~/h/useProfileId';
import useProfileMe from '~/h/useProfileMe';
import useLight from '~/h/useLight';

function useSetColor(profileId, profile) {
  return React.useCallback(
    async (color) => {
      try {
        queryCache.setQueryData('profileMe', (profile) => {
          return {
            ...profile,
            status: {
              ...profile.status,
              color,
            },
          };
        });
        await putStatusMe({ profileId, color });
        queryCache.refetchQueries(['profileMe', profileId]);
      } catch (e) {
        console.log(e);
      }
    },
    [profileId, profile]
  );
}

function usePostMessage(statusMe, message, profileId, setMessage) {
  return React.useCallback(async () => {
    try {
      await putStatusMe({ profileId, color: statusMe?.color, message });
      queryCache.refetchQueries(['profileMe', profileId]);
    } catch (e) {
      console.log(e);
    }
    setMessage('');
  }, [statusMe, message, profileId, setMessage]);
}

const StatusCenter = () => {
  const [message, setMessage] = React.useState('');
  const { backgrounds } = useLight();

  const profileId = useProfileId();
  const { profile } = useProfileMe();

  const statusMe = profile?.status;

  const setColor = useSetColor(profileId, profile);
  const postMessage = usePostMessage(statusMe, message, profileId, setMessage);

  return (
    <View style={{ backgroundColor: backgrounds[0] }}>
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
