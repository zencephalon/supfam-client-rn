import { queryCache } from 'react-query';
import { Alert } from 'react-native';
import useProfileId from '~/h/useProfileId';
import useApi from '~/h/useApi';
import { postAcceptFriendInvite, postDeclineFriendInvite } from '~/apis/api';

export const useAcceptInvite = (from_profile_id, callback) => {
  const Accept = useApi(postAcceptFriendInvite);
  const to_profile_id = useProfileId();

  return () => {
    Accept.call({ from_profile_id, to_profile_id });
    queryCache.invalidateQueries(['friends']);
    queryCache.invalidateQueries(['friendInvitesTo', to_profile_id]);
    callback();
  };
}

export const useDeclineInvite = (fromFriend, callback) => {
  const Decline = useApi(postDeclineFriendInvite);
  const profileId = useProfileId();

  return () => {
    Alert.alert(
      'Are you sure?',
      `If you decline ${fromFriend.name}'s invitation, you won't be able to be friends with them on Supfam.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Decline',
          onPress: () => {
            Decline.call({
              from_profile_id: fromFriend.id,
              to_profile_id: profileId,
            });
            callback();
          },
        },
      ],
      { cancelable: false }
    );
  }
};
