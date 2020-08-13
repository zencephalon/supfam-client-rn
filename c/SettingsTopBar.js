import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';
import TopBarBackButton from '~/c/TopBarBackButton';

import useLight from '~/h/useLight';

export default function SettingsTopBar({ title }) {
  const { foregrounds, backgrounds } = useLight();

  return (
    <SfTopBar style={{ paddingBottom: 6 }}>
      <TopBarBackButton />
      <SfText style={{ color: foregrounds[1] }}>{title}</SfText>
      <TouchableOpacity style={{ padding: 4 }}>
        <MaterialIcons
          name="settings"
          size={24}
          style={{ color: backgrounds[0] }}
        />
      </TouchableOpacity>
    </SfTopBar>
  );
}
