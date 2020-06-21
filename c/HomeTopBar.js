import React from 'react';
import SfText from '~/c/SfText';

import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import useLight from '~/h/useLight';
import { useNavigation } from '@react-navigation/native';

export default function HomeTopBar({ title }) {
  const navigation = useNavigation();

  const { foregrounds, backgrounds, light } = useLight();
  return (
    <View
      style={{
        paddingTop: 24,
        paddingRight: 8,
        paddingLeft: 8,
        paddingBottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: backgrounds[0],
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: light ? 0.1 : 0.4,
        shadowRadius: 3,
        zIndex: 2,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <MaterialIcons
          name="settings"
          size={24}
          style={{ color: foregrounds[1] }}
        />
      </TouchableOpacity>
      <SfText style={{ color: foregrounds[1] }}>{title}</SfText>
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
