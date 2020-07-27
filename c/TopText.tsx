import * as React from 'react';

import { View, Text } from 'react-native';

import useLight from '~/h/useLight';

export default React.memo(function TopText({
  title,
  rightSection,
}: {
  title: string;
  rightSection?: React.ReactElement;
}) {
  const { foregrounds } = useLight();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: foregrounds[1],
            fontWeight: '500',
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      {rightSection}
    </View>
  );
});
