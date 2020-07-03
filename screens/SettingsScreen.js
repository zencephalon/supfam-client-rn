import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AuthToken from '~/lib/AuthToken';
import { LOGOUT } from '~/apis/auth/actions';
import { connect } from 'react-redux';

import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import SfButton from '~/c/SfButton';
import SettingsTopBar from '~/c/SettingsTopBar';

import statusColors from '~/constants/statusColors';

import downloadUpdate from '~/lib/downloadUpdate';

export default connect()(function LinksScreen(props) {
  return (
    <SfKeyboardAvoidingView>
      <SettingsTopBar title="Settings" />
      <SfButton
        title="Log out"
        onPress={() => {
          AuthToken.remove();
          props.dispatch(LOGOUT());
        }}
        color={statusColors[0]}
        style={{ marginTop: 16, marginBottom: 16 }}
      />
      <SfButton
        title="Download update"
        onPress={downloadUpdate}
        color={statusColors[2]}
      />
    </SfKeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
