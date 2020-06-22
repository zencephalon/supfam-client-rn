import React from 'react';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';

import ProfileIcon from '~/c/ProfileIcon';

export default function ConversationTopBar({ profileId, name, navigation }) {
  const { foregrounds } = useLight();
  return (
    <SfTopBar style={{ justifyContent: 'flex-start' }}>
      <TouchableOpacity style={{ padding: 4 }} onPress={() => navigation.pop()}>
        <Ionicons name="ios-arrow-back" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
      <View
        style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'center' }}
      >
        <ProfileIcon profileId={profileId} />
        <SfText style={{ fontSize: 24, marginLeft: 8, color: foregrounds[1] }}>
          {name}
        </SfText>
      </View>
      <TouchableOpacity style={{ padding: 4 }}>
        <MaterialIcons name="settings" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
    </SfTopBar>
  );
}
