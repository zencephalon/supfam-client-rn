import React from 'react';
import { View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';

import SfButton from '~/c/SfButton';
import { OPEN } from '~/constants/Colors';

const GroupNameForm = (props) => {
  const { conversation } = props;
  const [name, setName] = React.useState(conversation?.name);

  const submit = () => {
    console.log("submit name", name);
  };

  return (
    <View
      style={{
        marginLeft: 8,
        marginRight: 8,
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      <SfTextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setName}
        placeholder="Enter a name for your group"
        textInputStyle={{ fontSize: 16 }}
        value={name}
      />
      <SfButton
        en
        round
        color={OPEN}
        title='Save Group Name'
        onPress={submit}
        style={{
          marginTop: 16,
        }}
      />
    </View>
  );
};

export default GroupNameForm;
