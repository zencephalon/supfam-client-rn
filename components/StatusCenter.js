import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import SfTextInput from './SfTextInput';

import StatusButton from '~/components/StatusButton';

import { nord5 } from '~/constants/Colors';

import { getStatusMe, putStatusMe } from '~/apis/api';

import { useQuery, useMutation, queryCache } from 'react-query';

const StatusCenter = props => {
  const [message, setMessage] = React.useState('');
  const [mutateStatus] = useMutation(putStatusMe, {
    onSuccess: () => {
      // queryCache.refetchQueries('statusMe');
    },
  });
  const { data: statusMe, status } = useQuery('statusMe', getStatusMe);

  const setColor = React.useCallback(async color => {
    await mutateStatus({ color });
  });

  const postMessage = React.useCallback(async () => {
    if (status === 'success') {
      await mutateStatus({ color: statusMe?.color, message });
      setMessage('');
    }
  }, [statusMe, message, status]);

  return (
    <React.Fragment>
      <SfTextInput
        placeholder={statusMe?.message || 'Loading...'}
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={postMessage}
        style={styles.statusInput}
      />
      <View style={styles.tabBarInfoContainer}>
        {[0, 1, 2, 3].map(color => {
          return (
            <StatusButton color={color} setColor={setColor} key={`${color}`} />
          );
        })}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  statusButton: {
    padding: 10,
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
  },
  statusInput: {
    padding: 12,
    fontSize: 14,
    backgroundColor: nord5,
  },
  tabBarInfoContainer: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default StatusCenter;
