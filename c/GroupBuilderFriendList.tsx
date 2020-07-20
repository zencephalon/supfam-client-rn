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

function useRenderAddToGroupRow(setAddingProfileIds) {
  const add = React.useCallback(
    (profileId) => {
      setAddingProfileIds((addingProfileIds: number[]) => [
        ...addingProfileIds,
        profileId,
      ]);
    },
    [setAddingProfileIds]
  );

  const remove = React.useCallback(
    (profileId) => {
      setAddingProfileIds((addingProfileIds: number[]) =>
        addingProfileIds.filter((id) => id != profileId)
      );
    },
    [setAddingProfileIds]
  );

  const renderAddToGroupRow = React.useCallback(
    ({ item: profile }) => {
      return <AddToGroupRow profile={profile} add={add} remove={remove} />;
    },
    [add, remove]
  );

  return renderAddToGroupRow;
}

function useSubmit(addingProfileIds: number[], conversationId: number) {
  const creatorProfileId = useProfileId();
  const linkTo = useLinkTo();
  const navigation = useNavigation();

  const Create = useApi(postConversationCreateWithMembers);
  const AddMembers = useApi(postConversationAddMembers);
  const { refetch: groupConvoRefetch } = useGroupConversations();

  const submit = React.useCallback(() => {
    (async () => {
      const profileIds = addingProfileIds;
      if (conversationId) {
        // Existing conversation, do add
        AddMembers.call({ conversationId, profileIds });
        groupConvoRefetch();
        navigation.navigate('Conversation', {
          conversationId,
        });
      } else {
        // If there is only one profileId, just go to that DM
        if (profileIds.length == 1) {
          linkTo(`/dm/${profileIds[0]}`);
          return;
        }

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
  }, [addingProfileIds, conversationId, navigation.navigate, linkTo]);

  return submit;
}

function useFilteredFriends(conversationId: number, searchQuery: string) {
  const conversation = useCachedConversation(conversationId);

  let { friends } = useFriends();

  // Filter out friends who are already in the conversation
  if (conversation?.member_profile_ids) {
    friends = friends.filter(
      (friend) => !conversation.member_profile_ids.includes(friend.id)
    );
  }

  const query = searchQuery.toLowerCase();

  if (searchQuery) {
    friends = friends.filter((friend) => {
      // Consider using a fuzzy finder here
      return friend.name.toLowerCase().includes(query);
    });
  }

  return friends;
}

const GroupBuilderFriendList = ({
  conversationId,
}: {
  conversationId: number;
}) => {
  const { backgrounds } = useLight();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [addingProfileIds, setAddingProfileIds] = React.useState([]);
  const renderAddToGroupRow = useRenderAddToGroupRow(setAddingProfileIds);

  const friends = useFilteredFriends(conversationId, searchQuery);

  const submit = useSubmit(addingProfileIds, conversationId);

  const disabled = addingProfileIds.length === 0;

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
        {addingProfileIds.map((profileId) => (
          <ProfileIcon noBadge profileId={profileId} key={profileId} />
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
