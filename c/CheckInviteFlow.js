import React from 'react';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';

import { Platform } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

import { postVerify } from '~/apis/api';

function useApi(api, { onConfirm, onError } = {}) {
  const [requested, setRequested] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  return {
    call: async (params) => {
      setRequested(true);

      api(params)
        .then((json) => {
          setRequested(false);
          if (json.error) {
            setFailed(true);
            setError(json.error);
            onError?.(json.error);
          } else {
            setError(undefined);
            setFailed(false);
            setConfirmed(true);
            setData(json);
            onConfirm?.(json);
          }
        })
        .catch((e) => {
          setError(e);
          setFailed(true);
          setRequested(false);
          setConfirmed(false);
          onError?.(e);
        });
    },
    req: {
      requested,
      confirmed,
      failed,
      data,
      error,
    },
  };
}

function CheckInviteFlow(props) {
  const [phone, setPhone] = React.useState('');
  const phoneNumber = parsePhoneNumberFromString(phone, 'US');

  const { call: checkInvite, req: checkInviteReq } = useApi(postVerify);

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
