import React from 'react';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import { OPEN, FREE, OPEN_LIGHT } from '~/constants/Colors';

function VerifyCodeFlow(props) {
  const { token } = props;

  return (
    <React.Fragment>
      <SfText style={{ marginTop: 32, marginBottom: 16 }}>
        Enter your verification code:
      </SfText>
      <SfTextInput />
      <SfButton color={OPEN} style={{ marginTop: 16 }} title="Verify" />
      <SfButton color={OPEN_LIGHT} title="Resend code" />
    </React.Fragment>
  );
}

export default VerifyCodeFlow;
