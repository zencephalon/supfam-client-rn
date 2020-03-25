import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { tabIconDefault, tabIconSelected } from '../constants/Colors';

import useLight from '~/hooks/useLight';

export default function TabBarIcon(props) {
  const { foregrounds } = useLight();
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? foregrounds[0] : foregrounds[2]}
    />
  );
}
