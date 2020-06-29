import * as React from 'react';
import SfButton from '~/c/SfButton';

export default function ContactsPromptRow({ prompt, requestPermission }) {
  return (
    <SfButton
      title="Use contacts to find your fam"
      buttonTextStyle={{ fontSize: 16 }}
      onPress={requestPermission}
    />
  );
}
