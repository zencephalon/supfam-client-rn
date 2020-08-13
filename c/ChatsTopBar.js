import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';
import TopBarBackButton from '~/c/TopBarBackButton';

import useLight from '~/h/useLight';

export default function ChatsTopBar({ title }) {
  const navigation = useNavigation();

  const { foregrounds } = useLight();
  return (
    <SfTopBar style={{ paddingBottom: 6 }}>
      <TopBarBackButton />
      <SfText style={{ color: foregrounds[1] }}>{title}</SfText>
      <TouchableOpacity
        style={styles.addButton}
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

const styles = StyleSheet.create({
  addButton: {
    padding: 4,
    paddingLeft: 24,
  },
});
