import React from 'react';
import { View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';

import SfButton from '~/c/SfButton';
import { OPEN } from '~/constants/Colors';

import { putConversationName } from '~/apis/api';
import useApi from '~/h/useApi';
import useCachedConversation from '~/h/useCachedConversation';
import useGroupConversations from '~/h/useGroupConversations';

const GroupNameForm = ({ conversationId }) => {
  const conversation = useCachedConversation(conversationId);
  const [name, setName] = React.useState(conversation?.name);
  const [changed, setChanged] = React.useState(false);

  const { call, req } = useApi(putConversationName);

  const { refetch } = useGroupConversations();

  const edit = (name) => {
    setName(name);
    setChanged(true);
  };

  const submit = () => {
    (async () => {
      await call({ conversationId: conversationId, name });
      refetch();
      setChanged(false);
    })();
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
        onChangeText={edit}
        placeholder="Give your group a name"
        textInputStyle={{ fontSize: 20 }}
        value={name}
        ok={req.confirmed && !req.requested}
        working={req.requested}
      />
      {changed ? (
        <SfButton
          en
          color={OPEN}
          title="Save Name"
          onPress={submit}
          style={{
            marginTop: 16,
          }}
        />
      ) : null}
    </View>
  );
};

export default GroupNameForm;
