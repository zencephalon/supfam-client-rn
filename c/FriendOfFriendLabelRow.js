import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import SfTextButton from '~/c/SfTextButton';
import SfText from '~/c/SfText';

export default function FriendOfFriendLabelRow({ showAll }) {
  return (
    <View style={styles.inviteFriendRow}>
      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', marginTop: 8, flex: 1 }}>
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              width: 0, // hack to get text to wrap
              alignItems: 'flex-start',
            }}
          >
            <SfText
              style={{
                fontSize: 16,
                flexGrow: 1,
                flexShrink: 1,
                marginLeft: 8,
                overflow: 'hidden',
              }}
            >
              Friends of Friends
            </SfText>
            <View
              style={{
                position: 'absolute',
                left: 130,
                top: -12,
              }}
            >
              <SfTextButton
                title="(View More)"
                onPress={showAll}
                buttonTextStyle={{
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inviteFriendRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 20,
    marginTop: 4,
  },
});
