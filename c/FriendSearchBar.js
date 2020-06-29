import React from 'react';
import { View, TextInput } from 'react-native';
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
        // alignItems: 'center',
        // justifyContent: '',
      }}
    >
      <SfTextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={updateQuery}
        placeholder="🔍 Search"
        style={{}}
        // textStyle={{ color: '#000' }}
        value={query}
      />
    </View>
  );
};

export default FriendSearchBar;
