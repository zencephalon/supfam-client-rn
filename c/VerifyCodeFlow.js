import React from 'react';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import { OPEN } from '~/constants/Colors';

function VerifyCodeFlow(props) {
  const { token } = props;

  return (
    <React.Fragment>
      <SfText style={{ marginTop: 32, marginBottom: 16 }}>
        Enter your verification code:
      </SfText>
      <SfTextInput />
      <SfButton
        style={{ marginTop: 8, backgroundColor: OPEN }}
        title="Verify"
      />
      <SfButton title="Resend code" />
    </React.Fragment>
  );
}

export default VerifyCodeFlow;
