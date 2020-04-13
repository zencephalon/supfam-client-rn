import React from 'react';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';

import { Platform } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

import { postCheckInvite } from '~/apis/api';
import useApi from '~/hooks/useApi';

function CheckInviteFlow(props) {
  const [phone, setPhone] = React.useState('');
  const phoneNumber = parsePhoneNumberFromString(phone, 'US');

  const { call: checkInvite, req: checkInviteReq } = useApi(postCheckInvite);

  const token = checkInviteReq.data?.token;
  if (token) {
    return props.render({ token });
  }

  const checkDisabled = !phoneNumber?.isValid() || checkInviteReq.requested;

  return (
    <React.Fragment>
      <SfText style={{ marginBottom: 16 }}>
        Supfam allows invited users only. Please enter your phone to check for
        your invitation.
      </SfText>
      <SfText style={{ marginBottom: 4 }}>
        {new AsYouType('US').input(phone)}
      </SfText>
      <SfTextInput
        autoCompleteType="tel"
        textContentType="telephoneNumber"
        keyboardType={
          Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'
        }
        dataDetectorTypes="phoneNumber"
        value={phone}
        onChangeText={setPhone}
        placeholder="your phone number"
      />
      <SfButton
        style={{ marginTop: 8 }}
        title={checkInviteReq.requested ? 'Checking...' : 'Check for invite'}
        disabled={checkDisabled}
        onPress={
          checkDisabled
            ? () => {}
            : () => {
                checkInvite({ phone: phoneNumber?.number });
              }
        }
      />
      {checkInviteReq.failed && (
        <SfText>
          Sorry, we couldn't find an invitation for your phone number.
        </SfText>
      )}
    </React.Fragment>
  );
}

export default CheckInviteFlow;
