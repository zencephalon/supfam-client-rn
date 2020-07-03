import React from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AddToGroupRow from '~/c/AddToGroupRow';
import FriendSearchBar from '~/c/FriendSearchBar';
import GroupBuilderForm from '~/c/GroupBuilderForm';
import SfButton from '~/c/SfButton';
import SfText from '~/c/SfText';

import useLight from '~/h/useLight';
import { OPEN } from '~/constants/Colors';

import useSfListAnimation from '~/h/useSfListAnimation';
import useFriends from '~/h/useFriends';
import useProfileId from '~/h/useProfileId';

import { postConversationCreateWithMembers } from '~/apis/api';
import useApi from '~/h/useApi';


const GroupBuilderFriendList = (props) => {
  const { conversation } = props;
  const { backgrounds } = useLight();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [addingProfiles, setAddingProfiles] = React.useState([]);

  const add = React.useCallback((profile) => {
    setAddingProfiles([...addingProfiles, profile]);
  }, [addingProfiles]);

  const remove = React.useCallback((profileId) => {
    const filteredAddingProfiles = addingProfiles.filter((profile) => (profile.id != profileId));
    setAddingProfiles(filteredAddingProfiles);
  }, [addingProfiles]);

  const renderAddToGroupRow = React.useCallback(
    ({ item: profile }) => {
      return <AddToGroupRow profile={profile} add={add} remove={remove}/>;
    },
    [add, remove]
  );

  const Create = useApi(postConversationCreateWithMembers);
  const creatorProfileId = useProfileId();
  const submit = () => {
    (async () => {
      console.log("submiting the group builder form to add new people to group");
      const profileIds = addingProfiles.map((profile) => (profile.id));
      const result = await Create.call({ profileIds, creatorId: creatorProfileId });
      console.log("result of create call was", result);
      if(result.conversation_id) {
        // Redirect into the newly created group conversation with this Id
      } else {
        // error
      }
    })()
  }

  let { friends, refetch, isFetching } = useFriends();

  // Filter out friends who are already in the conversation
  if(conversation) {
    friends = friends.filter((friend) => (
      !conversation.member_profile_ids.includes(friend.id)
    ));
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
      <SfText style={{
        paddingTop: 8,
        paddingBottom: 8,
      }}>
        {
          conversation ?
          <>Adding to existing group:</>
          :
          <>Creating a new group with:</>
        }
      </SfText>
      <>
      {
        addingProfiles.map((profile) => (
          <SfText key={profile.id}>{profile.name}</SfText>
        ))
      }
      </>
      {/* <GroupBuilderForm conversation={conversation} /> */}
      <SfButton
        round
        color={OPEN}
        title="Create Group"
        onPress={() => submit()}
        style={{
          marginTop: 16,
        }}
      />
    </>
  );
};

export default GroupBuilderFriendList;
