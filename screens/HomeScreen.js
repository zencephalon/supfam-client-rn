import * as React from 'react';

import FriendList from '~/c/FriendList';
import StatusCenter from '~/c/StatusCenter';
import HomeTopBar from '~/c/HomeTopBar';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import AddChoiceModal from '~/c/AddChoiceModal';

export default function HomeScreen({ navigation }) {
  const [showAddChoiceModal, setShowAddChoiceModal] = React.useState(false);

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={-48}>
      <AddChoiceModal
        visible={showAddChoiceModal}
        setVisible={setShowAddChoiceModal}
        navigation={navigation}
      />
      <HomeTopBar title="Supfam" setShowAddChoiceModal={setShowAddChoiceModal}/>
      <FriendList navigation={navigation} />

      <StatusCenter />
    </SfKeyboardAvoidingView>
  );
}