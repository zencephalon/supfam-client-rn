import React from 'react';
import {StyleSheet, View} from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import { OPEN, OPEN_LIGHT } from '~/constants/Colors';

import { postVerify, postResendCode } from '~/apis/api';
import useApi from '~/h/useApi';

function VerifyCodeFlow(props) {
  const { token } = props;
  const [code, setCode] = React.useState('');
  const Verify = useApi(postVerify);
  const Resend = useApi(postResendCode);

  if (Verify.req.confirmed) {
    return props.render({ token });
  }

  const onChangeText = (text) => {
    setCode(text);
    if (text.length === 4) {
      Verify.call({ token, code: text });
    }
  };

  return (
    <View style={styles.formContainer}>
      <SfText style={styles.formLabel}>
        Enter your verification code:
      </SfText>
      <SfTextInput
        value={code}
        onChangeText={onChangeText}
        textContentType="oneTimeCode"
        ok={code.length === 4}
        style={styles.formInput}
      />
      <SfButton
        round
        color={OPEN}
        style={{ marginTop: 16 }}
        title={Verify.req.requested ? 'Verifying...' : 'Verify'}
        disabled={Verify.req.requested}
        onPress={() => Verify.call({ token, code })}
      />
      <SfText style={styles.subText}>Resend code</SfText>
      {/* <SfButton
        round
        color={OPEN_LIGHT}
        title={Resend.req.requested ? 'Resending...' : 'Resend code'}
        disabled={Resend.req.requested}
        onPress={() => Resend.call({ token })}
      /> */}
      {Verify.req.failed && <SfText>Verification failed.</SfText>}
    </View>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    marginBottom: 16,
    marginTop: 16,
    color: 'white'
  },
  formContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 80,
  },
  formInput: {
    marginBottom: 20,
  },
  subText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#cfcd51',
  }
});

export default VerifyCodeFlow;
