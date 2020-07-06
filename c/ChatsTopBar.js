import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';

export default function ChatsTopBar({ title }) {
  const navigation = useNavigation();

  const { foregrounds } = useLight();
  return (
    <SfTopBar style={{ paddingBottom: 6 }}>
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() => navigation.openDrawer()}
      >
        <MaterialIcons name="menu" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
      <SfText style={{ color: foregrounds[1] }}>{title}</SfText>
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() =>
          navigation.navigate('New Group', { conversationId: null })
        }
      >
        <MaterialIcons
          name="group-add"
          size={24}
          style={{ color: foregrounds[1] }}
        />
      </TouchableOpacity>
    </SfTopBar>
  );
}
