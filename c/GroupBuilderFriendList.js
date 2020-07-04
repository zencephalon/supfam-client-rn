import React from 'react';
import { RefreshControl, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AddToGroupRow from '~/c/AddToGroupRow';
import FriendSearchBar from '~/c/FriendSearchBar';
import SfButton from '~/c/SfButton';
import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';

import useLight from '~/h/useLight';
import { OPEN } from '~/constants/Colors';

import useSfListAnimation from '~/h/useSfListAnimation';
import useFriends from '~/h/useFriends';
import useProfileId from '~/h/useProfileId';
import useGroupConversations from '~/h/useGroupConversations';

import { postConversationCreateWithMembers } from '~/apis/api';
import useApi from '~/h/useApi';

const GroupBuilderFriendList = (props) => {
  const { conversation, navigation } = props;
  const { backgrounds } = useLight();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [addingProfiles, setAddingProfiles] = React.useState([]);

  const add = React.useCallback(
    (profile) => {
      setAddingProfiles([...addingProfiles, profile]);
    },
    [addingProfiles]
  );

  const remove = React.useCallback(
    (profileId) => {
      const filteredAddingProfiles = addingProfiles.filter(
        (profile) => profile.id != profileId
      );
      setAddingProfiles(filteredAddingProfiles);
    },
    [addingProfiles]
  );

  const renderAddToGroupRow = React.useCallback(
    ({ item: profile }) => {
      return <AddToGroupRow profile={profile} add={add} remove={remove} />;
    },
    [add, remove]
  );

  const Create = useApi(postConversationCreateWithMembers);
  const creatorProfileId = useProfileId();
  const { refetch: groupConvoRefetch } = useGroupConversations();
  const submit = () => {
    (async () => {
      const profileIds = addingProfiles.map((profile) => profile.id);
      const result = await Create.call({
        profileIds,
        creatorId: creatorProfileId,
      });
      if (result.conversation_id) {
        // Redirect into the newly created group conversation with this Id
        groupConvoRefetch();
        navigation.navigate('Conversation', {
          conversationId: result.conversation_id,
        });
      } else {
        // error
      }
    })();
  };

  let { friends, refetch, isFetching } = useFriends();

  // Filter out friends who are already in the conversation
  if (conversation) {
    friends = friends.filter(
      (friend) => !conversation.member_profile_ids.includes(friend.id)
    );
  }

  if (searchQuery) {
    friends = friends.filter((friend) => {
      // Consider using a fuzzy finder here
      return friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  useSfListAnimation(friends);

  return (
    <>
      <FlatList
        inverted
        data={friends}
        style={{ backgroundColor: backgrounds[0] }}
        renderItem={renderAddToGroupRow}
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
      <SfText
        style={{
          margin: 8,
          fontSize: 16,
        }}
      >
        {conversation ? (
          <>Adding to existing group:</>
        ) : (
          <>Creating a new group with:</>
        )}
      </SfText>
      <View style={{ flexDirection: 'row', marginLeft: 8, marginRight: 8 }}>
        {addingProfiles.map((profile) => (
          <ProfileIcon noBadge profileId={profile.id} key={profile.id} />
        ))}
      </View>
      {/* <GroupBuilderForm conversation={conversation} /> */}
      <SfButton
        round
        color={OPEN}
        title={conversation ? 'Create Group' : 'Update Group'}
        onPress={() => submit()}
        style={{
          marginTop: 16,
        }}
      />
    </>
  );
};

export default GroupBuilderFriendList;
