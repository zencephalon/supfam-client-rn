import React from 'react';
import { RefreshControl, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useLinkTo } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import AddToGroupRow from '~/c/AddToGroupRow';
import FriendSearchBar from '~/c/FriendSearchBar';
import SfButton from '~/c/SfButton';
import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';

import useSfListAnimation from '~/h/useSfListAnimation';
import useFriends from '~/h/useFriends';
import useProfileId from '~/h/useProfileId';
import useGroupConversations from '~/h/useGroupConversations';
import useCachedConversation from '~/h/useCachedConversation';

import useLight from '~/h/useLight';
import { OPEN } from '~/constants/Colors';

import {
  postConversationCreateWithMembers,
  postConversationAddMembers,
} from '~/apis/api';
import useApi from '~/h/useApi';

function useRenderAddToGroupRow(setAddingProfiles) {
  const add = React.useCallback(
    (profile) => {
      setAddingProfiles((addingProfiles) => [...addingProfiles, profile]);
    },
    [setAddingProfiles]
  );

  const remove = React.useCallback(
    (profileId) => {
      setAddingProfiles((addingProfiles) =>
        addingProfiles.filter((profile) => profile.id != profileId)
      );
    },
    [setAddingProfiles]
  );

  const renderAddToGroupRow = React.useCallback(
    ({ item: profile }) => {
      return <AddToGroupRow profile={profile} add={add} remove={remove} />;
    },
    [add, remove]
  );

  return renderAddToGroupRow;
}

const GroupBuilderFriendList = ({ conversationId }) => {
  const { conversation } = useCachedConversation(conversationId);
  const { backgrounds } = useLight();
  const linkTo = useLinkTo();
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [addingProfiles, setAddingProfiles] = React.useState([]);
  const renderAddToGroupRow = useRenderAddToGroupRow(setAddingProfiles);

  const creatorProfileId = useProfileId();
  const Create = useApi(postConversationCreateWithMembers);
  const AddMembers = useApi(postConversationAddMembers);
  const { refetch: groupConvoRefetch } = useGroupConversations();
  const submit = () => {
    (async () => {
      const profileIds = addingProfiles.map((profile) => profile.id);
      if (conversationId) {
        // Existing conversation, do add
        AddMembers.call({ conversationId, profileIds });
        groupConvoRefetch();
        navigation.navigate('Conversation', {
          conversationId,
        });
      } else {
        // New group conversation, do create
        const result = await Create.call({
          profileIds,
          creatorId: creatorProfileId,
        });
        if (result?.conversation_id) {
          // Redirect into the newly created group conversation with this Id
          groupConvoRefetch();
          linkTo(`/conversation/${result.conversation_id}`);
        } else {
          console.log('error creating conversation');
        }
      }
    })();
  };

  let { friends, refetch, isFetching } = useFriends();

  // Filter out friends who are already in the conversation
  if (conversation?.member_profile_ids) {
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

  const disabled = addingProfiles.length === 0;

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
      {!disabled && (
        <SfText
          style={{
            margin: 8,
            fontSize: 16,
          }}
        >
          {conversationId ? (
            <>Adding to existing group:</>
          ) : (
            <>Creating a new group with:</>
          )}
        </SfText>
      )}
      <View style={{ flexDirection: 'row', marginLeft: 8, marginRight: 8 }}>
        {addingProfiles.map((profile) => (
          <ProfileIcon noBadge profileId={profile.id} key={profile.id} />
        ))}
      </View>
      <SfButton
        en
        round
        disabled={disabled}
        color={OPEN}
        title={conversationId ? 'Update Group' : 'Create Group'}
        onPress={disabled ? () => {} : submit}
        style={{
          marginTop: 16,
        }}
      />
    </>
  );
};

export default GroupBuilderFriendList;
