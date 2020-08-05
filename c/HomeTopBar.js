import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';

export default function HomeTopBar({ title }) {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();

  const { foregrounds } = useLight();

  const openAddActionSheet = () => {
    const options = ['Add Fam', 'Create Group', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            navigation.navigate('Invite');
            break;
          case 1:
            navigation.navigate('New Group', { conversationId: null });
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <SfTopBar style={{ paddingBottom: 6 }}>
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() => navigation.navigate('Settings')}
      >
        <MaterialIcons name="settings" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
      <SfText style={{ color: foregrounds[1] }}>{title}</SfText>
      <TouchableOpacity style={{ padding: 4 }} onPress={openAddActionSheet}>
        <MaterialIcons
          name="person-add"
          size={24}
          style={{ color: foregrounds[1] }}
        />
      </TouchableOpacity>
    </SfTopBar>
  );
}
