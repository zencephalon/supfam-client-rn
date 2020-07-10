import * as React from 'react';
import * as SMS from 'expo-sms';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

import SfText from '~/c/SfText';
import SfInlineButton from '~/c/SfInlineButton';

import useProfileId from '~/h/useProfileId';
import useApi from '~/h/useApi';
import { postInvitation } from '~/apis/api';

export default function InviteContactRow({ contact }) {
  const Invitation = useApi(postInvitation);
  const profileId = useProfileId();

  const smsInvite = () => {
    (async () => {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        // Open pre-filled SMS
        await SMS.sendSMSAsync(
          [contact.phone],
          `Hey ${
            contact.firstName || contact.name
          }, I'm using Supfam and I want you to join my fam so we can keep close. You can download it here: https://supfam.app/download`
        );

        // Create invitation record for this phone number
        const parsedPhoneNum = parsePhoneNumberFromString(contact.phone, 'US')
          ?.number;
        if (parsedPhoneNum) {
          Invitation.call({
            from_profile_id: profileId,
            phone: parsedPhoneNum,
          });
        }
      } else {
        console.log('SMS not available');
      }
    })();
  };

  return (
    <TouchableOpacity style={styles.inviteFriendRow} onPress={smsInvite}>
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
              {parsePhoneNumberFromString(
                contact.phone,
                'US'
              )?.formatNational() || contact.phone}
            </SfText>
            <View
              style={{
                position: 'absolute',
                right: 4,
                top: 0,
              }}
            >
              <SfInlineButton title="Text to Invite" onPress={smsInvite} />
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
