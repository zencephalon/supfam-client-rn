import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import SfContainer from '~/c/SfContainer';

import { Platform } from 'react-native';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

import IntlPhoneInput from 'react-native-intl-phone-input';

import { postCheckInvite } from '~/apis/api';
import useApi from '~/h/useApi';
import useLight from '~/h/useLight';

import { elementSizes } from '~/constants/Sizes';

const onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
  console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
};

function CheckInviteFlow(props) {
  const [phone, setPhone] = React.useState({});
  const { foregrounds, backgrounds } = useLight();

  const { call: checkInvite, req: checkInviteReq } = useApi(postCheckInvite);

  const token = checkInviteReq.data?.token;
  if (token) {
    return props.render({ token });
  }

  const checkDisabled = !phone?.isVerified || checkInviteReq.requested;

  return (
    <SfContainer>
      <SfText style={styles.explainerText}>
        Please provide your phone number so that we can verify that you are a
        real person, and link your account to you.
      </SfText>
    
      <IntlPhoneInput containerStyle={{ backgroundColor: backgrounds[1], marginTop: 8 }} dialCodeTextStyle={{ color: foregrounds[0], fontSize: 24 }} phoneInputStyle={{ color: foregrounds[0], backgroundColor: backgrounds[1], fontSize: 24 }} onChangeText={setPhone} defaultCountry="US"  />

      <SfButton
        round
        style={{ marginTop: 8 }}
        title={checkInviteReq.requested ? 'Sending...' : 'Send code'}
        disabled={checkDisabled}
        onPress={
          checkDisabled
            ? () => {}
            : () => {
                checkInvite({ phone: `${phone.dialCode}${phone.unmaskedPhoneNumber}` });
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
