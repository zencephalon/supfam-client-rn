import React from 'react';
import * as Contacts from 'expo-contacts';
import { FlatList } from 'react-native-gesture-handler';

import InviteFriendRow from '~/c/InviteFriendRow';
import RespondToInviteRow from '~/c/RespondToInviteRow';
import ContactsPromptRow from '~/c/ContactsPromptRow';
import InviteContactRow from '~/c/InviteContactRow';

import useLight from '~/h/useLight';
import useFriendsOfFriends from '~/h/useFriendsOfFriends';
import useSfListAnimation from '~/h/useSfListAnimation';
import { useFriendInvitesFrom, useFriendInvitesTo } from '~h/useFriendInvites';
import _ from 'lodash';

const renderInviteRow = ({ item: profileOrInvite }) => {
  if (profileOrInvite.type == 'invite') {
    return <InviteFriendRow profile={profileOrInvite} />;
  } else if (profileOrInvite.type == 'respond') {
    return <RespondToInviteRow invite={profileOrInvite} />;
  } else if (profileOrInvite.type == 'contacts_prompt') {
    return <ContactsPromptRow prompt={profileOrInvite} />
  } else {
    return <InviteContactRow contact={profileOrInvite} />
  }
};

function useInvitableFriends() {
  const { friendsOfFriends } = useFriendsOfFriends();
  const { friendInvitesFrom } = useFriendInvitesFrom();
  const { friendInvitesTo } = useFriendInvitesTo();

  return friendsOfFriends
    .filter((friend) => {
      // Find matching friend invites
      const invitesToFriend = friendInvitesFrom.filter(
        (invite) => invite.to_profile_id == friend.id
      );
      const declined = _.some(
        invitesToFriend,
        (invite) => invite.status === 'declined'
      );

      // If there is a "declined" status friend request we will remove this friend from the list
      return !declined;
    })
    .map((friend) => {
      const invitesFromFriend = friendInvitesTo.filter(
        (invite) => invite.from_friend.id == friend.id
      );

      const hasInvite = _.some(
        invitesFromFriend,
        (invite) => invite.status == 'pending'
      );

      // If there is an invite, let the user respond to it
      if (hasInvite) {
        return {
          ...friend,
          type: 'respond',
        };
      }

      const invitesToFriend = friendInvitesFrom.filter(
        (invite) => invite.to_profile_id == friend.id
      );

      // If there is a "pending" status friend request, we will pass that through so that "cancel invitation" can be shown instead of "invite"
      const inviteSent = _.some(
        invitesToFriend,
        (invite) => invite.status === 'pending'
      );

      return {
        ...friend,
        type: 'invite',
        inviteSent,
      };
    });
}

const FriendOfFriendList = () => {
  const invitableFriends = useInvitableFriends();

  (async () => {
    const { status } = await Contacts.getPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        let contacts = [];
        data.forEach((contact) => {
          // console.log(contact);
          if(contact.contactType != 'person') { return; }
          let contactPhoneNumber;
          let contactPhoneType = 'none';
          contact.phoneNumbers?.forEach((phoneNumber) => {
            if(phoneNumber.label == 'mobile') {
              contactPhoneNumber = phoneNumber.digits;
              contactPhoneType = 'mobile';
            }
            if(contactPhoneType != 'mobile' && [].includes(phoneNumber.label)) {
              contactPhoneNumber = phoneNumber.digits;
              contactPhoneType = phoneNumber.label;
            }
          })
          if(contactPhoneNumber) {
            const contactToShow = {
              type: 'contact',
              name: contact.name,
              phone: contactPhoneNumber,
              id: contactPhoneNumber,
            }
            contacts.push(contactToShow);
          }
        });

        invitableFriends.push(...contacts);
      }
    } else {
      // Adds a one off "import contacts" button to the list of contacts if this permission doesn't already exist
      const linkContants = {
        type: 'contacts_prompt',
        text: 'Import contacts to find more friends...'
      }
      invitableFriends.push(linkContants);
    }
  })()

  const { backgrounds } = useLight();

  useSfListAnimation(invitableFriends);

  return (
    <FlatList
      inverted
      data={invitableFriends}
      style={{ backgroundColor: backgrounds[0] }}
      renderItem={renderInviteRow}
      keyExtractor={(profile) => `${profile.type}${profile.id}`}
    />
  );
};

export default FriendOfFriendList;
