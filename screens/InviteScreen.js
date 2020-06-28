import React from 'react';
import SfContainer from '~/c/SfContainer';
import FriendOfFriendList from '~/c/FriendOfFriendList';

export default function InviteScreen({navigation}) {
  return (
    <SfContainer>
      <FriendOfFriendList navigation={navigation} />
    </SfContainer>
  );
}
