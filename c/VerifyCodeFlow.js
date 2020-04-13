import React from 'react';
import SfTextInput from '~/c/SfTextInput';
import SfText from '~/c/SfText';
import SfButton from '~/c/SfButton';
import { OPEN, OPEN_LIGHT } from '~/constants/Colors';

import { postVerify } from '~/apis/api';
import useApi from '~/hooks/useApi';

function VerifyCodeFlow(props) {
  const { token } = props;
  const [code, setCode] = React.useState('');
  const { call, req } = useApi(postVerify);

  if (req.confirmed) {
    return props.render({ token });
  }

  const verify = () => {
    call({ token, code });
  };
  const onChangeText = (text) => {
    setCode(text);
    if (text.length === 4) {
      verify();
    }
  };

  return (
    <React.Fragment>
      <SfText style={{ marginTop: 32, marginBottom: 16 }}>
        Enter your verification code:
      </SfText>
      <SfTextInput value={code} onChangeText={onChangeText} />
      <SfButton
        color={OPEN}
        style={{ marginTop: 16 }}
        title="Verify"
        onPress={verify}
      />
      <SfButton color={OPEN_LIGHT} title="Resend code" />
    </React.Fragment>
  );
}

export default VerifyCodeFlow;
