import { configureAPI } from 'redux-rest-reducer';
import { API_URL } from '~/lib/constants';
import AuthToken from '~/lib/AuthToken';
import processMessage from '~/lib/processMessage';

const setAuthHeader = (headers) => {
  const token = AuthToken.get()?.token;
  return { ...headers, Authorization: `${token}` };
};

const api = configureAPI(API_URL, { headerFunc: setAuthHeader });

export const getFriends = (_key, profileId) => {
  return api.fetchFromAPI(`friends/${profileId}`);
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

// export const getConversationMembership
export const getDmMembership = (_key, dmId) => {
  return api.fetchFromAPI(`conversations/${dmId}/dmMembership`);
};

export const postConversationRead = (conversationId, messageId) => {
  return api.postToAPI(`conversations/${conversationId}/read/${messageId}`);
};

export const getConversationPreview = (_key, conversationId) => {
  return api.fetchFromAPI(`conversations/${conversationId}/preview`);
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
