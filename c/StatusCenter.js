import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import SfTextInput from './SfTextInput';

import StatusButton from '~/c/StatusButton';

import { getProfile, putStatusMe } from '~/apis/api';

import { useQuery, useMutation, queryCache } from 'react-query';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OPEN } from '~/constants/Colors';
import statusColors from '~/constants/statusColors';

import { TouchableOpacity } from 'react-native-gesture-handler';
import useProfileId from '~/hooks/useProfileId';

import ProfileIcon, { ProfileIconFromProfile } from '~/c/ProfileIcon';

import useLight from '~/hooks/useLight';

const StatusCenter = () => {
  const profileId = useProfileId();
  const [message, setMessage] = React.useState('');
  // const [mutateStatus] = useMutation(putStatusMe, {
  //   onSuccess: () => {
  //     queryCache.refetchQueries(['profileMe', profileId]);
  //   },
  // });
  const { data: profile, status } = useQuery(
    profileId && ['profileMe', profileId],
    getProfile,
    {
      onSuccess: (profile) => {
        queryCache.setQueryData(['friend', profileId], profile);
      },
    }
  );

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

  const { backgrounds } = useLight();

  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 8,
          paddingRight: 8,
          marginBottom: 8,
          borderTopColor: backgrounds[1],
          borderTopWidth: 1,
          paddingTop: 8,
          alignItems: 'flex-end',
        }}
      >
        <ProfileIconFromProfile profile={profile} size={48} />
        <SfTextInput
          placeholder={statusMe?.message || 'Loading...'}
          value={message}
          onChangeText={setMessage}
          // onSubmitEditing={postMessage}
          textInputStyle={styles.statusInput}
          style={{ flexGrow: 1, flexShrink: 1 }}
          multiline={true}
        />
        <TouchableOpacity
          onPress={postMessage}
          style={{
            alignSelf: 'flex-start',
            marginLeft: 4,
          }}
        >
          <MaterialCommunityIcons
            name="send"
            size={24}
            color={statusColors[statusMe?.color] || OPEN}
          />
        </TouchableOpacity>
      </View>
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
  statusInput: {
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 0,
    paddingBottom: 4,
  },
  tabBarInfoContainer: {
    alignItems: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default StatusCenter;
