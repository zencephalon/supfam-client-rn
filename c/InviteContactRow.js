import * as React from 'react';

import * as SMS from 'expo-sms';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfInlineButton from '~/c/SfInlineButton';

export default function InviteContactRow({ contact }) {
  const smsInvite = () => {
    (async () => {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        console.log("sms found to be available")
        // do your SMS stuff here
        const { result } = await SMS.sendSMSAsync(
          ['0123456789', '9876543210'],
          'My sample HelloWorld message',
        );
        console.log("result", result);
      } else {
        // misfortune... there's no SMS available on this device
        console.log("sorry, sms not avail");
      }
    })()
  }

  return (
    <TouchableOpacity
      style={styles.inviteFriendRow}
      onPress={smsInvite}
    >
      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', marginTop: 8, flex: 1 }}>
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
                flexGrow: 1,
                flexShrink: 1,
                marginLeft: 8,
                overflow: 'hidden',
              }}
            >
              {contact.name}
            </SfText>
            <SfText
              style={{
                fontSize: 16,
                flexGrow: 1,
                flexShrink: 1,
                marginLeft: 8,
                overflow: 'hidden',
              }}
            >
              {contact.phone}
            </SfText>
            <View style={{
              position: 'absolute',
              right: 4,
              top: 0,
            }}>
              <SfInlineButton
                title="Text to Invite"
                onPress={smsInvite}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inviteFriendRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
  },
});
