import * as React from 'react';

import FriendList from '~/c/FriendList';
import StatusCenter from '~/c/StatusCenter';
import HomeTopBar from '~/c/HomeTopBar';
import SfKeyboardAvoidingView from '~/c/SfKeyboardAvoidingView';
import AddChoiceModal from '~/c/AddChoiceModal';
import ReplyStatusModal from '~/c/ReplyStatusModal';

export default function HomeScreen({ navigation }) {
  const [showAddChoiceModal, setShowAddChoiceModal] = React.useState(false);
  const [showReplyStatusModal, setShowReplyStatusModal] = React.useState(false);
  const [replyingToProfileId, setReplyingToProfileId] = React.useState(undefined);

  const replyToStatus = (profileId) => {
    setReplyingToProfileId(profileId);
    setShowReplyStatusModal(true);
  }

  return (
    <SfKeyboardAvoidingView keyboardVerticalOffset={-48}>
      <AddChoiceModal
        visible={showAddChoiceModal}
        setVisible={setShowAddChoiceModal}
        navigation={navigation}
      />
      <ReplyStatusModal
        visible={showReplyStatusModal}
        setVisible={setShowReplyStatusModal}
        profileId={replyingToProfileId}
      />
      <HomeTopBar title="Supfam" setShowAddChoiceModal={setShowAddChoiceModal}/>
      <FriendList navigation={navigation} replyToStatus={replyToStatus}/>

      <StatusCenter />
    </SfKeyboardAvoidingView>
  );
}