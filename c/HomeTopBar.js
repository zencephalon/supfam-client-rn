import React from 'react';
import SfText from '~/c/SfText';

import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

export default function HomeTopBar(props) {
  return (
    <View
      style={{
        marginTop: 16,
        marginRight: 8,
        marginLeft: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity>
        <MaterialIcons name="settings" size={24} style={{ color: '#fff' }} />
      </TouchableOpacity>
      <SfText>Supfam</SfText>
      <TouchableOpacity>
        <MaterialIcons name="person-add" size={24} style={{ color: '#fff' }} />
      </TouchableOpacity>
    </View>
  );
}
