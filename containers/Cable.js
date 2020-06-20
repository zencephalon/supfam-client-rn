import React, { Fragment, useEffect } from 'react';

import cable from '~/lib/Cable';
import useProfileId from '~/h/useProfileId';
import useFriends from '~/h/useFriends';
import useConversationMemberships from '~/h/useConversationMemberships';
import usePushToken from '~/h/usePushToken';

import useDeepCompareEffect from 'use-deep-compare-effect';

function CableContainer() {
  const profileId = useProfileId();
  const { friends } = useFriends();
  const { conversationMemberships } = useConversationMemberships();
  const friendIds = (friends || []).map((f) => f.id).sort();
  const conversationIds = (conversationMemberships || [])
    .map((cm) => cm.conversation_id)
    .sort();

  usePushToken();

  useEffect(() => {
    console.log('initializing cable');
    cable.init();
    return () => {
      console.log('canceling cable');
      cable.disconnect();
    };
  }, []);

  useEffect(() => {
    cable.setProfileId(profileId);
  }, [profileId]);

  useDeepCompareEffect(() => {
    cable.setupFriendChannels(friendIds);
    return () => {
      cable.cleanupFriendChannels();
    };
  }, [friendIds]);

  useDeepCompareEffect(() => {
    cable.setupConversationChannels(conversationIds);
    return () => {
      cable.cleanupConversationChannels();
    };
  }, [conversationIds]);

  return null;
}

export default CableContainer;
