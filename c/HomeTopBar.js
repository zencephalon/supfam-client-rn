import React from 'react';
import SfText from '~/c/SfText';

import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import useLight from '~/h/useLight';
import { useNavigation } from '@react-navigation/native';

export default function HomeTopBar(props) {
  const navigation = useNavigation();

  const { foregrounds } = useLight();
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
        <MaterialIcons
          name="settings"
          size={24}
          style={{ color: foregrounds[1] }}
        />
      </TouchableOpacity>
      <SfText style={{ color: foregrounds[1] }}>Supfam</SfText>
      <TouchableOpacity onPress={() => navigation.navigate('Invite')}>
        <MaterialIcons
          name="person-add"
          size={24}
          style={{ color: foregrounds[1] }}
        />
      </TouchableOpacity>
    </View>
  );
}
