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

const StatusCenter = () => {
  const profileId = useProfileId();
  const [message, setMessage] = React.useState('');
  const [mutateStatus] = useMutation(putStatusMe, {
    onSuccess: () => {
      queryCache.refetchQueries(['profileMe', profileId]);
    },
  });
  const { data: profile, status } = useQuery(
    profileId && ['profileMe', profileId],
    getProfile
  );

  const statusMe = profile?.status;

  const setColor = React.useCallback(async (color) => {
    await mutateStatus({ profileId, color });
  });

  const postMessage = React.useCallback(async () => {
    if (status === 'success') {
      await mutateStatus({ profileId, color: statusMe?.color, message });
      setMessage('');
    }
  }, [statusMe, message, status]);

  return (
    <React.Fragment>
      <View style={{ flexDirection: 'row' }}>
        <SfTextInput
          placeholder={statusMe?.message || 'Loading...'}
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={postMessage}
          textInputStyle={styles.statusInput}
          style={{ marginLeft: 4, marginBottom: 8, flexGrow: 1, flexShrink: 1 }}
        />
        <TouchableOpacity
          onPress={postMessage}
          style={{
            alignSelf: 'flex-start',
            marginLeft: 4,
            marginRight: 4,
            marginBottom: 4,
            marginTop: 10,
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
    marginBottom: -1,
  },
  tabBarInfoContainer: {
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'black',
    //     shadowOffset: { width: 0, height: -3 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 3,
    //   },
    //   android: {
    //     elevation: 20,
    //   },
    // }),
    alignItems: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default StatusCenter;
