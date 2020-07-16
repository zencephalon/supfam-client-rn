import React from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useActionSheet } from '@expo/react-native-action-sheet';

import SfText from '~/c/SfText';
import ProfileIcon from '~/c/ProfileIcon';
import ProfileName from '~/c/ProfileName';

import TypingText from '~/c/TypingText';
import MessageImagePreview from '~/c/MessageImagePreview';
import MessageText from '~/c/MessageText';
import QuotedMessageText from '~/c/QuotedMessageText';
import MessageSentTimeText from '~/c/MessageSentTimeText';
import SfLinkPreview from '~/c/SfLinkPreview';

import useOpenReplyModal from '~/h/useOpenReplyModal';
import useOpenMessageActionModal from '~/h/useOpenMessageActionModal';

function Message(props) {
  const { message, isOwnMessage, fromSameUser, breakAbove } = props;

  const [showDate, setShowDate] = React.useState(false);

  const { showActionSheetWithOptions } = useActionSheet();
  const openMessageActionModal = useOpenMessageActionModal(
    message.profile_id,
    message.message,
    'message',
    message.conversation_id
  );

  // const openActionSheet = () => {
  //   const options = ['Copy', 'Reply', 'Cancel'];
  //   const cancelButtonIndex = 2;

  //   showActionSheetWithOptions(
  //     {
  //       options,
  //       cancelButtonIndex,
  //     },
  //     (buttonIndex) => {
  //       switch (buttonIndex) {
  //         case 0:
  //           Clipboard.setString(message.message);
  //           showMessage({
  //             message: 'Copied to clipboard!',
  //             type: 'info',
  //           });
  //           break;
  //         case 1:
  //           openReplyModal();
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   );
  // };

  return (
    <View>
      {(breakAbove || showDate) && (
        <MessageSentTimeText sentDate={message.updated_at} />
      )}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 4,
          marginTop: fromSameUser && !message.breakAbove ? 0 : 12,
          alignItems: 'flex-start',
          justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
          marginLeft: 8,
          marginRight: 8,
        }}
      >
        <View style={{ width: 40 }}>
          {!isOwnMessage && !fromSameUser && (
            <ProfileIcon profileId={message.profile_id} size={32} />
          )}
          {message.queued && <ActivityIndicator size="small" />}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowDate(!showDate);
          }}
          onLongPress={() => {
            // openActionSheet();
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
            {message.type === 1 && message.image && (
              <MessageImagePreview image={message.image} />
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
      {showDate && (
        <View
          style={{
            flexDirection: 'column',
            marginBottom: 4,
            // alignItems: isOwnMessage ? 'flex-end' : 'flex-end',
            alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
            width: '80%',
            // justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
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

export default Message;
