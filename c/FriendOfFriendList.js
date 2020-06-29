import React from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import InviteFriendRow from '~/c/InviteFriendRow';
import RespondToInviteRow from '~/c/RespondToInviteRow';
import ContactsPromptRow from '~/c/ContactsPromptRow';
import InviteContactRow from '~/c/InviteContactRow';
import FriendSearchBar from '~/c/FriendSearchBar';

import useLight from '~/h/useLight';

import useSfListAnimation from '~/h/useSfListAnimation';
import useContactsPermission from '~/h/useContactsPermission';
import useContacts from '~/h/useContacts';
import useInvitableFriends from '~/h/useInvitableFriends';

const useRenderInviteRow = (requestPermission) => {
  return React.useCallback(
    ({ item: profileOrInvite }) => {
      if (profileOrInvite.type == 'invite') {
        return <InviteFriendRow profile={profileOrInvite} />;
      } else if (profileOrInvite.type == 'respond') {
        return <RespondToInviteRow invite={profileOrInvite} />;
      } else if (profileOrInvite.type == 'contacts_prompt') {
        return (
          <ContactsPromptRow
            requestPermission={requestPermission}
            prompt={profileOrInvite}
          />
        );
      } else {
        return <InviteContactRow contact={profileOrInvite} />;
      }
    },
    [requestPermission]
  );
};

const FriendOfFriendList = () => {
  const { backgrounds } = useLight();
  const [searchQuery, setSearchQuery] = React.useState('');
  const { allowed, requestPermission } = useContactsPermission();

  const renderInviteRow = useRenderInviteRow(requestPermission);

  let {
    friends: invitableFriends,
    isFetching,
    refetch,
  } = useInvitableFriends();
  const contacts = useContacts(allowed);

  invitableFriends = [...invitableFriends, ...contacts];

  if (searchQuery) {
    invitableFriends = invitableFriends.filter((friend) => {
      // Consider using a fuzzy finder here
      return friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  if (!allowed) {
    // Adds a one off "import contacts" button to the list of contacts if this permission doesn't already exist
    const linkContants = {
      type: 'contacts_prompt',
    };
    invitableFriends.push(linkContants);
  }

  useSfListAnimation(invitableFriends);

  return (
    <>
      <FlatList
        inverted
        data={invitableFriends}
        style={{ backgroundColor: backgrounds[0] }}
        renderItem={renderInviteRow}
        keyExtractor={(profile) => `${profile.type}${profile.id}`}
        refreshControl={
          <RefreshControl
            // TODO: this should use `isFetching` but that makes it spin forever for some reason
            refreshing={false}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      />
      <FriendSearchBar updateQuery={setSearchQuery} />
    </>
  );
};

export default FriendOfFriendList;
