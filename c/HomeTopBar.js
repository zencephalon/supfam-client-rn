import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';

export default function HomeTopBar({ title }) {
  const navigation = useNavigation();

  const { foregrounds, backgrounds, light } = useLight();
  return (
    <SfTopBar>
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
    </SfTopBar>
  );
}
