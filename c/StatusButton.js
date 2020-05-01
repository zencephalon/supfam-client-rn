import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import statusColors, {
  statusColorsDeep,
  statusColorsLight,
} from '~/constants/statusColors';

import SfText from '~/c/SfText';

const colorLabels = ['Away', 'Busy', 'Free', 'Open'];

import useLight from '~/h/useLight';

const StatusButton = ({ color, setColor, selected }) => {
  const { foregrounds, backgrounds, light } = useLight();
  const shadowColors = statusColorsLight;
  return (
    <React.Fragment>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.statusButton,
          {
            ...Platform.select({
              ios: selected
                ? {}
                : {
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                  },
              android: selected
                ? {}
                : {
                    elevation: 20,
                  },
            }),
            backgroundColor: statusColors[color],
            borderTopColor: selected ? backgrounds[1] : statusColors[color],
            borderBottomColor: !selected
              ? shadowColors[color]
              : statusColors[color],
            borderTopWidth: 2,
            borderBottomWidth: selected ? 0 : 4,
            borderLeftWidth: selected && color > 0 ? 2 : 0,
            borderRightWidth: selected && color < 3 ? 2 : 0,
            borderLeftColor: selected
              ? shadowColors[color]
              : statusColors[color],
            borderRightColor: selected
              ? shadowColors[color]
              : statusColors[color],
            height: '100%',
          },
        ]}
        onPress={() => setColor(color)}
      >
        <SfText
          style={{
            fontWeight: '700',
            fontSize: 16,
            color: foregrounds[0],
            marginTop: selected ? 3 : 0,
            marginBottom: !selected ? 3 : 0,
          }}
        >
          {colorLabels[color]}
        </SfText>
      </TouchableOpacity>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  statusButton: {
    padding: 10,
    flexGrow: 1,
    alignItems: 'center',
  },
});

export default StatusButton;
