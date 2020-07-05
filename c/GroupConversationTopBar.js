import React from 'react';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

// import { useNavigation } from '@react-navigation/native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';

export default function GroupConversationTopBar({ conversation, navigation }) {
  // const navigation = useNavigation();
  const { foregrounds } = useLight();
  return (
    <SfTopBar style={{ justifyContent: 'space-between' }}>
      <TouchableOpacity
        style={{ paddingTop: 4, paddingBottom: 4, paddingRight: 24 }}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="ios-arrow-back" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          maxWidth: '60%',
        }}
      >
        <SfText style={{ fontSize: 16, marginLeft: 8, color: foregrounds[1] }}>
          {conversation?.name}
        </SfText>
      </View>
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() => navigation.navigate('Group Settings', { conversation })}
      >
        <MaterialIcons name="settings" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
    </SfTopBar>
  );
}
