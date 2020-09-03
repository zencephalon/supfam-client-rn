import React from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';
import ProfileName from '~/c/ProfileName';

import TypingText from '~/c/TypingText';
import MessageImagePreview from '~/c/MessageImagePreview';
import MessageText from '~/c/MessageText';
import QuotedMessageText from '~/c/QuotedMessageText';
import MessageSentTimeText from '~/c/MessageSentTimeText';
import SfLinkPreview from '~/c/SfLinkPreview';
import MessageReactions from '~/c/MessageReactions';

import useOpenMessageActionModal from '~/h/useOpenMessageActionModal';
import useGoGallery from '~/h/useGoGallery';
import useStoredMessage from '~/h/useStoredMessage';

import { useNavigation } from '@react-navigation/native';

function Message(props) {
  const navigation = useNavigation();

  const { messageId, isOwnMessage, fromSameUser, breakAbove } = props;
  const message = useStoredMessage(messageId);

  const [showDate, setShowDate] = React.useState(false);

  const openMessageActionModal = useOpenMessageActionModal(message);
  const goGallery = useGoGallery(message);

  if (!message) {
    return null;
  }

  return (
    <View>
      {(breakAbove || showDate) && (
        <MessageSentTimeText sentDate={message.updated_at} />
      )}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 4,
          marginTop: fromSameUser && !breakAbove ? 0 : 12,
          alignItems: 'flex-start',
          justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
          marginLeft: 8,
          marginRight: 8,
        }}
      >
        <View style={{ width: 40 }}>
          {!isOwnMessage && (!fromSameUser || breakAbove) && (
            <ProfileIcon profileId={message.profile_id} size={32} />
          )}
          {message.queued && <ActivityIndicator size="small" />}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowDate(!showDate);
            if (message.type === 1) {
              goGallery();
            }
          }}
          onLongPress={() => {
            if (message.i) {
              return;
            }
            Keyboard.dismiss();
            openMessageActionModal();
          }}
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            maxWidth: '80%',
          }}
        >
          <>
            {!isOwnMessage && !fromSameUser && (
              <SfText
                style={{
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  marginBottom: 4,
                }}
              >
                <ProfileName profileId={message.profile_id} />
              </SfText>
            )}
            {message.type === 0 && (
              <MessageText
                text={message.message}
                isOwnMessage={isOwnMessage}
                links={message.links}
              />
            )}
            {message.type === 1 && message.data?.image && (
              <MessageImagePreview
                uri={message.data.image.uri}
                width={message.data.image.width}
                height={message.data.image.height}
              />
            )}
            {message.type === 2 && (
              <QuotedMessageText
                quoted={message.data?.quoted}
                quotedProfileId={message.data?.profile_id}
                quoterProfileId={message.profile_id}
                quoteType={message.data?.quote_type}
                text={message.message}
                isOwnMessage={isOwnMessage}
                links={message.links}
              />
            )}
            {message.i ? (
              <SfText style={{ fontSize: 10 }}>
                <TypingText time={message.receivedAt} />
              </SfText>
            ) : null}
          </>
        </TouchableOpacity>
      </View>
      <MessageReactions
        reactions={message.reactions}
        messageId={message.id}
        isOwnMessage={isOwnMessage}
      />
      {showDate && message.links?.length > 0 && (
        <View
          style={{
            flexDirection: 'column',
            marginBottom: 4,
            alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
            width: '80%',
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          {message.links?.map((link, index) => (
            <SfLinkPreview url={link.url} key={index} />
          ))}
        </View>
      )}
    </View>
  );
}

export default React.memo(Message);
