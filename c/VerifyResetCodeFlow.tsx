import React from 'react';
import { StyleSheet, View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import SfContainer from '~/c/SfContainer';
import { OPEN, OPEN_LIGHT } from '~/constants/Colors';
import { elementSizes, fontSizes } from '~/constants/Sizes';

import { postVerifyReset, postResendResetCode } from '~/apis/api';
import useApi from '~/h/useApi';

function VerifyResetCodeFlow(props) {
  const { token } = props;
  const [code, setCode] = React.useState('');
  const Verify = useApi(postVerifyReset);
  const Resend = useApi(postResendResetCode);

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
    <SfContainer>
      <SfText style={styles.formLabel}>Enter your password reset code:</SfText>
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
        style={{ marginTop: elementSizes[3] }}
        title={Verify.req.requested ? 'Verifying...' : 'Verify'}
        disabled={Verify.req.requested}
        onPress={() => Verify.call({ token, code })}
      />
      <SfButton
        round
        color={OPEN_LIGHT}
        title={Resend.req.requested ? 'Resending...' : 'Resend code'}
        disabled={Resend.req.requested}
        onPress={() => Resend.call({ token })}
      />
      {Verify.req.failed && <SfText>Verification failed.</SfText>}
    </SfContainer>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    marginBottom: elementSizes[3],
    marginTop: elementSizes[3],
  },
  formContainer: {
    marginLeft: elementSizes[3],
    marginRight: elementSizes[3],
    marginTop: elementSizes[8],
  },
  formInput: {
    marginBottom: elementSizes[3],
  },
  subText: {
    fontSize: fontSizes[3],
    marginTop: elementSizes[4],
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#cfcd51',
  },
});

export default VerifyResetCodeFlow;
