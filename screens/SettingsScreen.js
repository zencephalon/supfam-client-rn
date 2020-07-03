import * as React from 'react';
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
