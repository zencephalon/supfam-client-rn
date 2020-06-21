import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';

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
    <View style={styles.formContainer}>
      <SfText style={ styles.explainerText }>
        Supfam only allows invited users. Enter your phone number to look for
        your invitation.
      </SfText>
      <SfText style={{...styles.phoneNumberPreview, color: foregrounds[3]}}>
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
        <SfText style={{color: foregrounds[3]}}>
          Sorry, we couldn't find an invitation for your phone number.
        </SfText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  explainerText: {
    marginBottom: elementSizes[3],
    marginTop: elementSizes[3],
    color: 'white'
  },
  phoneNumberPreview: {
    height: elementSizes[5],
    marginBottom: elementSizes[1],
  },
  formContainer: {
    marginLeft: elementSizes[3],
    marginRight: elementSizes[3],
    marginTop: elementSizes[8],
  },
  phoneInput: {
    marginBottom: elementSizes[4],
  }
});

export default CheckInviteFlow;
