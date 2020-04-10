import React from 'react';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import { Platform } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import { useMutation } from 'react-query';

import { postVerify2 as postVerify } from '~/apis/api';

function PhoneVerifyFlow() {
  const [phone, setPhone] = React.useState('');
  const phoneNumber = parsePhoneNumberFromString(phone, 'US');
  const [errored, setErrored] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);

  const checkInvite = async () => {
    setVerifying(true);
    postVerify({ phone: phoneNumber?.number })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setErrored(true);
        }
        setVerifying(false);
      })
      .catch((e) => {
        setErrored(true);
        setVerifying(false);
      });
  };

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
      {phoneNumber?.isValid() && (
        <SfButton
          style={{ marginTop: 8 }}
          title={verifying ? 'Checking...' : 'Check for invite'}
          disabled={verifying}
          onPress={verifying ? () => {} : checkInvite}
        />
      )}
      {errored && (
        <SfText>
          Sorry, we couldn't find an invitation for your phone number.
        </SfText>
      )}
    </React.Fragment>
  );
}

export default PhoneVerifyFlow;
