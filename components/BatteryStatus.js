import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Colors from '~/constants/Colors';

function BatteryStatus({ battery, batteryState }) {
  // batteryState 0 is unknown, so ok to skip here
  if (!battery || !batteryState) {
    return null;
  }

  let icon = 'battery-unknown';
  let charging;
  let color;

  if (batteryState === 1) {
    if (battery < 0.05) {
      icon = 'battery-outline';
    } else if (battery < 0.1) {
      icon = 'battery-10';
    } else if (battery < 0.2) {
      icon = 'battery-20';
    } else if (battery < 0.3) {
      icon = 'battery-30';
    } else if (battery < 0.4) {
      icon = 'battery-40';
    } else if (battery < 0.5) {
      icon = 'battery-50';
    } else if (battery < 0.6) {
      icon = 'battery-60';
    } else if (battery < 0.7) {
      icon = 'battery-70';
    } else if (battery < 0.8) {
      icon = 'battery-80';
    } else if (battery < 0.9) {
      icon = 'battery-90';
    } else {
      icon = 'battery';
    }
    if (battery < 0.2) {
      color = Colors.red;
    } else if (battery < 0.5) {
      color = Colors.yellow;
    } else {
      color = '#CCC';
    }
  }
  if (batteryState === 2) {
    if (battery < 0.05) {
      icon = 'battery-charging-outline';
    } else if (battery < 0.1) {
      icon = 'battery-charging-10';
    } else if (battery < 0.2) {
      icon = 'battery-charging-20';
    } else if (battery < 0.3) {
      icon = 'battery-charging-30';
    } else if (battery < 0.4) {
      icon = 'battery-charging-40';
    } else if (battery < 0.5) {
      icon = 'battery-charging-50';
    } else if (battery < 0.6) {
      icon = 'battery-charging-60';
    } else if (battery < 0.7) {
      icon = 'battery-charging-70';
    } else if (battery < 0.8) {
      icon = 'battery-charging-80';
    } else if (battery < 0.9) {
      icon = 'battery-charging-90';
    } else {
      icon = 'battery-charging-100';
    }
    color = Colors.green;
    charging = true;
  }

  return (
    <MaterialCommunityIcons
      style={{ marginRight: charging ? 0 : -2, marginLeft: charging ? 2 : 0 }}
      name={icon}
      size={14}
      color={color}
    />
  );
}

export default BatteryStatus;
