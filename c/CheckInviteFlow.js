import React from 'react';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';

import { Platform } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

import { postVerify } from '~/apis/api';

function CheckInviteFlow(props) {
  const [phone, setPhone] = React.useState('');
  const phoneNumber = parsePhoneNumberFromString(phone, 'US');
  const [errored, setErrored] = React.useState(false);
  const [checking, setchecking] = React.useState(false);
  const [token, setToken] = React.useState(null);

  const checkInvite = async () => {
    setchecking(true);
    setErrored(false);
    postVerify({ phone: phoneNumber?.number })
      .then((data) => {
        setchecking(false);
        if (data.error) {
          setErrored(true);
        } else {
          setErrored(false);
          setToken(data.token);
        }
      })
      .catch((e) => {
        setErrored(true);
        setchecking(false);
      });
  };

  if (token) {
    return props.render({ token });
  }

  const checkDisabled = !phoneNumber?.isValid() || checking;

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
        title={checking ? 'Checking...' : 'Check for invite'}
        disabled={checkDisabled}
        onPress={checkDisabled ? () => {} : checkInvite}
      />
      {errored && (
        <SfText>
          Sorry, we couldn't find an invitation for your phone number.
        </SfText>
      )}
    </React.Fragment>
  );
}

export default CheckInviteFlow;
