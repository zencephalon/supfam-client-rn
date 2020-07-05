import * as React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfInlineButton from '~/c/SfInlineButton';
import ProfileIcon from '~/c/ProfileIcon';

import useCachedProfile from '~/h/useCachedProfile';
// import useApi from '~/h/useApi';

export default function GroupMemberRow({ profileId }) {
  const [removed, setRemoved] = React.useState(false);
  const profile = useCachedProfile(profileId);

  const remove = () => {
    setRemoved(true);
  }

  return (
    <TouchableOpacity
      style={styles.addToGroupRow}
      onPress={() => {
        if (!removed) {
          remove();
        }
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', marginTop: 8, flex: 1 }}>
          <ProfileIcon
            noBadge
            profileId={profile.id}
            size={48}
            avatar_url={profile.avatar_url}
          />
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
              {profile.name}
            </SfText>
            <View
              style={{
                position: 'absolute',
                right: 4,
                top: 0,
              }}
            >
              {removed ? (
                <SfInlineButton
                  title="Remove"
                  disabled
                  onPress={() => {}}
                />
              ) : (
                <SfInlineButton title="Remove" onPress={() => remove()} />
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addToGroupRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 12,
  },
});
