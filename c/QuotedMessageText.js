import React from 'react';
import { View } from 'react-native';

import useLight from '~/h/useLight';
import SfText from '~/c/SfText';
import MessageText from '~/c/MessageText';
import ProfileName from '~/c/ProfileName';

import useProfileId from '~/h/useProfileId';

const MAX_QUOTED_DISPLAY_LENGTH = 72;

export default React.memo(function QuotedMessageText({
  quoted,
  text,
  isOwnMessage,
  links,
  quoteType,
  quotedProfileId,
  quoterProfileId,
}) {
  const profileId = useProfileId();
  const youAreQuoted = quotedProfileId == profileId;
  const { backgrounds, foregrounds } = useLight();

  const truncatedQuoted =
    quoted?.length > MAX_QUOTED_DISPLAY_LENGTH
      ? quoted.substring(0, MAX_QUOTED_DISPLAY_LENGTH) + '...'
      : quoted;

  return (
    <View style={{ alignItems: isOwnMessage ? 'flex-end' : 'flex-start' }}>
      {quotedProfileId && (
        <SfText style={{ fontSize: 12, color: foregrounds[7] }}>
          {isOwnMessage ? 'You' : <ProfileName profileId={quoterProfileId} />}{' '}
          replied to{' '}
          {youAreQuoted ? 'your' : <ProfileName profileId={quotedProfileId} />}
          {youAreQuoted ? '' : "'s"} {quoteType}:
        </SfText>
      )}
      {quoted && (
        <SfText
          style={{
            fontSize: 16,
            backgroundColor: isOwnMessage ? backgrounds[1] : backgrounds[2],
            padding: 8,
            borderRadius: 10,
            overflow: 'hidden',
            paddingBottom: 16,
            marginBottom: -8,
          }}
        >
          {truncatedQuoted}
        </SfText>
      )}
      <MessageText text={text} links={links} isOwnMessage={isOwnMessage} />
    </View>
  );
});
