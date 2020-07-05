import React from 'react';
import { View } from 'react-native';
import SfTextInput from '~/c/SfTextInput';

const FriendSearchBar = (props) => {
  const [query, setQuery] = React.useState('');

  const updateQuery = (text) => {
    props.updateQuery(text);
    setQuery(text);
  };

  return (
    <View
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      <SfTextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={updateQuery}
        placeholder="🔍 Search"
        textInputStyle={{ fontSize: 16 }}
        value={query}
      />
    </View>
  );
};

export default FriendSearchBar;
