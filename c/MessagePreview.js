import * as React from 'react';
import { View } from 'react-native';

import useLight from '~/h/useLight';

import ProfileIcon from '~/c/ProfileIcon';

import SfText from '~/c/SfText';

import { nord8 } from '~/constants/Colors';

export default React.memo(function MessagePreview({
  messageText,
  messageType,
  read,
  profileId,
}) {
  const { backgrounds } = useLight();

  let preview = '';
  preview = messageText;
  if (messageType === 1) {
    preview = 'Sent an image';
  }
  return (
    <View
      style={{
        alignSelf: 'flex-end',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingLeft: 4,
        paddingRight: 4,
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          flexGrow: 1,
          width: 0, // hack to get text to wrap
          alignItems: 'flex-start',
        }}
      >
        <SfText
          style={{
            fontSize: 16,
            backgroundColor: backgrounds[1],
            borderRadius: 10,
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 8,
            paddingLeft: 8,
            alignSelf: 'flex-end',
            // apparently necessary for borderRadius to work
            overflow: 'hidden',
          }}
          numberOfLines={1}
        >
          {preview}
        </SfText>
      </View>
      {profileId && (
        <View style={{ marginLeft: 4 }}>
          <ProfileIcon profileId={profileId} size={16} noBadge />
        </View>
      )}
      {!read && (
        <View
          style={{
            backgroundColor: nord8,
            borderRadius: 6,
            width: 12,
            height: 12,
            marginLeft: 4,
          }}
        />
      )}
    </View>
  );
});
