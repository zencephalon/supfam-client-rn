import { configureAPI } from 'redux-rest-reducer';
import { API_URL } from '~/lib/constants';
import AuthToken from '~/lib/AuthToken';
import processMessage from '~/lib/processMessage';

const setAuthHeader = (headers) => {
  const token = AuthToken.get()?.token;
  return { ...headers, Authorization: `${token}` };
};

const api = configureAPI(API_URL, { headerFunc: setAuthHeader });

export const getFriends = (profileId) => {
  return api.fetchFromAPI(`friends/${profileId}`);
};

export const getFriendsOfFriends = (_key, profileId) => {
  return api.fetchFromAPI(`friends_of_friends/${profileId}`);
};

export const getProfile = (_key, id) => {
  return api.fetchFromAPI(`profiles/${id}`);
};

export const getProfilesMe = () => {
  return api.fetchFromAPI('profiles/me');
};

export const getConversationMessages = (_key, { conversationId }, cursor) => {
  const cursorChunk = cursor ? `\?cursor=${cursor}` : '';
  return api
    .fetchFromAPI(`conversations/${conversationId}/messages${cursorChunk}`)
    .then(({ messages, next_cursor }) => {
      return {
        messages: messages.map(processMessage),
        next_cursor,
      };
    });
};

export const getProfileDmConversation = (_key, { profileId }) => {
  return api.fetchFromAPI(`conversations/profile/${profileId}`);
};

export const getConversation = (_key, { conversationId }) => {
  return api.fetchFromAPI(`conversations/${conversationId}`);
};

export const sendMessage = ({ meProfileId, conversationId, data }) => {
  return api.postToAPI(
    `conversations/${conversationId}/messages/profile/${meProfileId}`,
    {
      body: JSON.stringify(data),
    }
  );
};

export const getConversationMemberships = (_key) => {
  return api.fetchFromAPI(`conversation_memberships/me`);
};

export const getGroupConversations = (_key) => {
  return api.fetchFromAPI(`group_conversations/me`);
};

// export const getConversationMembership
export const getMembership = (_key, id) => {
  return api.fetchFromAPI(`conversations/${id}/membership`);
};

export const postConversationRead = (conversationId, messageId) => {
  return api.postToAPI(`conversations/${conversationId}/read/${messageId}`);
};

export const getConversationPreview = (_key, conversationId) => {
  return api.fetchFromAPI(`conversations/${conversationId}/preview`);
};

export const postConversationCreateWithMembers = ({ profileIds, creatorId }) => {
  return api.postToAPI(`conversations/create`, {
    body: JSON.stringify({ profileIds, creatorId }),
  });
};

export const postConversationAddMembers = ({ conversationId, profileIds }) => {
  return api.postToAPI(`conversations/${conversationId}/add_members`, {
    body: JSON.stringify({ profileIds }),
  });
};

export const postConversationRemoveMembers = ({ conversationId, profileId }) => {
  return api.postToAPI(`conversations/${conversationId}/remove_member`, {
    body: JSON.stringify({ profileId }),
  });
};

export const putStatusMe = (data) => {
  return api.putToAPI('statuses/me', {
    body: JSON.stringify(data),
  });
};

export const postCheckInvite = ({ phone }) => {
  return api.postToAPI(`check_invite`, {
    body: JSON.stringify({ phone }),
  });
};

export const postInvitation = ({ from_profile_id, phone }) => {
  return api.postToAPI(`invitations/create`, {
    body: JSON.stringify({ from_profile_id, phone }),
  });
};

export const postFriendInvite = ({ from_profile_id, to_profile_id }) => {
  return api.postToAPI(`friend_invites/create`, {
    body: JSON.stringify({ from_profile_id, to_profile_id }),
  });
};

export const postCancelFriendInvite = ({ from_profile_id, to_profile_id }) => {
  return api.postToAPI(`friend_invites/cancel`, {
    body: JSON.stringify({ from_profile_id, to_profile_id }),
  });
};

export const postDeclineFriendInvite = ({ from_profile_id, to_profile_id }) => {
  return api.postToAPI(`friend_invites/decline`, {
    body: JSON.stringify({ from_profile_id, to_profile_id }),
  });
};

export const postAcceptFriendInvite = ({ from_profile_id, to_profile_id }) => {
  return api.postToAPI(`friend_invites/accept`, {
    body: JSON.stringify({ from_profile_id, to_profile_id }),
  });
};

export const getFriendInvitesFrom = (_key, fromProfileId) => {
  return api.fetchFromAPI(`friend_invites/from/${fromProfileId}`);
};

export const getFriendInvitesTo = (_key, toProfileId) => {
  return api.fetchFromAPI(`friend_invites/to/${toProfileId}`);
};

export const postVerify = ({ token, code }) => {
  return api.postToAPI('verify', {
    body: JSON.stringify({ token, code }),
  });
};

export const postResendCode = ({ token }) => {
  return api.postToAPI('resend_code', {
    body: JSON.stringify({ token }),
  });
};

export const getNameAvailable = ({ name }) => {
  return api.fetchFromAPI(`username/available?name=${encodeURI(name)}`);
};

export const postRegister = ({
  name,
  password,
  passwordConfirmation,
  token,
}) => {
  return api.postToAPI(`register`, {
    body: JSON.stringify({
      name,
      password,
      password_confirmation: passwordConfirmation,
      token,
    }),
  });
};

export const postLogin = ({ name, password }) => {
  return api.postToAPI(`login`, {
    body: JSON.stringify({ name, password }),
  });
};

export const fetchPresigned = (filetype) => {
  return api.fetchFromAPI(`uploads/presigned?filetype=${filetype}`);
};

async function getLocalBlob(uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
}

export const uploadImage = async (uri) => {
  const fileExtension = uri.split('.').pop();
  const { url, key } = await fetchPresigned(fileExtension);

  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await getLocalBlob(uri);

  await fetch(url, {
    method: 'PUT',
    body: blob,
  });

  blob.close();
  return { key };
};

export const postProfile = ({ name, avatar_key }) => {
  return api.postToAPI(`profiles`, {
    body: JSON.stringify({ name, avatar_key }),
  });
};

export const getPushToken = () => {
  return api.fetchFromAPI('push_token');
};

export const setPushToken = (token) => {
  return api.putToAPI(`push_token/${token}`);
};

export default api;
