import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';

export default function HomeTopBar({ title }) {
  const navigation = useNavigation();

  const { foregrounds, _, light } = useLight();
  return (
    <SfTopBar
      style={{
        paddingBottom: 10,
        paddingTop: 10,
        // Android
        elevation: light ? 2 : 4,
      }}
    >
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() => navigation.navigate('Settings')}
      >
        <MaterialIcons name="settings" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
      <SfText style={{ color: foregrounds[1] }}>{title}</SfText>
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() => navigation.navigate('Invite')}
      >
        <MaterialIcons
          name="person-add"
          size={24}
          style={{ color: foregrounds[1] }}
        />
      </TouchableOpacity>
    </SfTopBar>
  );
}
