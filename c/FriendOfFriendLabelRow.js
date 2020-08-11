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
              flexDirection: 'row',
              flexGrow: 1,
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <SfText
              style={{
                fontSize: 24,
                flexGrow: 1,
                flexShrink: 1,
                overflow: 'hidden',
                marginBottom: 10,
              }}
            >
              Your fam's fam
            </SfText>
            <SfTextButton
              title="(View More)"
              onPress={showAll}
              style={{ marginRight: 4 }}
              buttonTextStyle={{
                fontSize: 16,
                textDecorationLine: 'underline',
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
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
