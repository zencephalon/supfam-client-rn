import { useEffect } from 'react';
import { LayoutAnimation } from 'react-native';

export default function useSfListAnimation(listItems) {
  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      // update: { type: LayoutAnimation.Types.easeInEaseOut, property:  },
    });
  }, [listItems]);
}
