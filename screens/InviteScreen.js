import React from 'react';
import SfContainer from '~/c/SfContainer';
import SfText from '~/c/SfText';
import FriendOfFriendList from '~/c/FriendOfFriendList';

export default function InviteScreen({navigation}) {
  return (
    <SfContainer>
      <SfText>Who would you like to add?</SfText>
      <FriendOfFriendList navigation={navigation} />
    </SfContainer>
  );
}
