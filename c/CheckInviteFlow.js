import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import SfContainer from '~/c/SfContainer';

import { Platform } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

import { postCheckInvite } from '~/apis/api';
import useApi from '~/h/useApi';
import useLight from '~/h/useLight';

import { elementSizes } from '~/constants/Sizes';

function CheckInviteFlow(props) {
  const [phone, setPhone] = React.useState('');
  const phoneNumber = parsePhoneNumberFromString(phone, 'US');
  const { foregrounds } = useLight();

  const { call: checkInvite, req: checkInviteReq } = useApi(postCheckInvite);

  const token = checkInviteReq.data?.token;
  if (token) {
    return props.render({ token });
  }

  const checkDisabled = !phoneNumber?.isValid() || checkInviteReq.requested;

  return (
    <SfContainer>
      <SfText style={styles.explainerText}>
        Please provide your phone number so that we can verify that you are a
        real person, and link your account to you.
      </SfText>
      <SfText style={{ ...styles.phoneNumberPreview, color: foregrounds[2] }}>
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
        ok={!checkDisabled}
        style={styles.phoneInput}
      />
      <SfButton
        round
        style={{ marginTop: 8 }}
        title={checkInviteReq.requested ? 'Sending...' : 'Send code'}
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
        <SfText style={{ color: foregrounds[3] }}>
          Something went wrong, please try using a different phone number.
        </SfText>
      )}
    </SfContainer>
  );
}

const styles = StyleSheet.create({
  explainerText: {
    marginTop: 8,
    fontSize: 16,
    color: 'white',
  },
  phoneNumberPreview: {
    height: elementSizes[5],
  },
  formContainer: {
    marginLeft: elementSizes[3],
    marginRight: elementSizes[3],
  },
  phoneInput: {},
});

export default CheckInviteFlow;
