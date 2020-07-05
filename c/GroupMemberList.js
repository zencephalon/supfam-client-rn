import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import GroupMemberRow from '~/c/GroupMemberRow';

import useLight from '~/h/useLight';
import useSfListAnimation from '~/h/useSfListAnimation';

const GroupMemberList = (props) => {
  const { conversation } = props;
  const { backgrounds } = useLight();

  const groupMembers = conversation.member_profile_ids;

  const renderAddToGroupRow = React.useCallback(
    ({ item: profileId }) => {
      return <GroupMemberRow conversationId={conversation.id} profileId={profileId} />;
    },
    []
  );

  useSfListAnimation(groupMembers);

  return (
    <>
      <FlatList
        inverted
        data={groupMembers}
        style={{ backgroundColor: backgrounds[0] }}
        renderItem={renderAddToGroupRow}
        keyExtractor={(profileId) => `${profileId}`}
      />
    </>
  );
};

export default GroupMemberList;
