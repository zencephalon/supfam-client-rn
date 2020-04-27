import React from 'react';
import SfText from '~/c/SfText';

import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import useLight from '~/hooks/useLight';

export default function HomeTopBar(props) {
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
      <TouchableOpacity>
        <MaterialIcons
          name="person-add"
          size={24}
          style={{ color: foregrounds[1] }}
        />
      </TouchableOpacity>
    </View>
  );
}
