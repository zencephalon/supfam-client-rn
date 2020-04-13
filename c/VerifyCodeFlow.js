import React from 'react';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import { OPEN, OPEN_LIGHT } from '~/constants/Colors';

import { postVerify, postResendCode } from '~/apis/api';
import useApi from '~/hooks/useApi';

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
    <React.Fragment>
      <SfText style={{ marginTop: 32, marginBottom: 16 }}>
        Enter your verification code:
      </SfText>
      <SfTextInput
        value={code}
        onChangeText={onChangeText}
        textContentType="oneTimeCode"
        ok={code.length === 4}
      />
      <SfButton
        color={OPEN}
        style={{ marginTop: 16 }}
        title={Verify.req.requested ? 'Verifying...' : 'Verify'}
        disabled={Verify.req.requested}
        onPress={() => Verify.call({ token, code })}
      />
      <SfButton
        color={OPEN_LIGHT}
        title={Resend.req.requested ? 'Resending...' : 'Resend code'}
        disabled={Resend.req.requested}
        onPress={() => Resend.call({ token })}
      />
      {Verify.req.failed && <SfText>Verification failed.</SfText>}
    </React.Fragment>
  );
}

export default VerifyCodeFlow;
