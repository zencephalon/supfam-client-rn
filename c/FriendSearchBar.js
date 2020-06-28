import React from 'react';
import { View, TextInput } from 'react-native';

const FriendSearchBar = (props) => {
  const [query, setQuery] = React.useState('');

  const updateQuery = (text) => {
    props.updateQuery(text);
    setQuery(text);
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={updateQuery}
        placeholder='🔍 Search'
        style={{
          borderRadius: 25,
          borderColor: '#333',
          backgroundColor: '#fff'
        }}
        textStyle={{ color: '#000' }}
        value={query}
      />
    </View>
  );
};

export default FriendSearchBar;
